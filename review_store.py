"""Short lived, login protected review drafts for WhatsApp applications."""
import json, os, secrets, time
from auth_store import connection, pg_connection, DATABASE_URL

TTL=3600

def db_open():
    db=pg_connection() if DATABASE_URL else connection()
    db.execute('CREATE TABLE IF NOT EXISTS bdris_reviews (token TEXT PRIMARY KEY, owner TEXT NOT NULL, created BIGINT NOT NULL, status TEXT NOT NULL, payload TEXT NOT NULL)')
    db.commit()
    return db

def run(sql, params=(), one=False):
    db=db_open()
    try:
        cursor=db.execute(sql.replace('?', '%s') if DATABASE_URL else sql, params)
        result=cursor.fetchone() if one else None
        db.commit()
        return result
    finally: db.close()

def create(owner, raw, result, data, office):
    token=secrets.token_urlsafe(32)
    payload=json.dumps({'raw':raw,'result':result,'data':data,'office':office},ensure_ascii=False)
    run('INSERT INTO bdris_reviews VALUES (?,?,?,?,?)',(token,owner,int(time.time()),'pending',payload))
    return token

def get(token):
    row=run('SELECT owner,created,status,payload FROM bdris_reviews WHERE token=?',(token,),True)
    if not row or time.time()-row[1]>TTL: return None
    return {'owner':row[0],'status':row[2],**json.loads(row[3])}

def approve(token,data):
    row=get(token)
    if not row or row['status']!='pending': return False
    row['data']=data
    run('UPDATE bdris_reviews SET status=?,payload=? WHERE token=? AND status=?',('approved',json.dumps({key:row[key] for key in ('raw','result','data','office')},ensure_ascii=False),token,'pending'))
    return True
