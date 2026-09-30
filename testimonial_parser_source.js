

function enToBnNumeral(value){
  return String(value ?? "").replace(/[0-9]/g, d => "০১২৩৪৫৬৭৮৯"[Number(d)]);
}

function BANGLA_DATE(value){
  const s = String(value ?? "").trim().replace(/[০-৯]/g, d => "0123456789"["০১২৩৪৫৬৭৮৯".indexOf(d)]);
  const m = s.match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})$/);
  if(!m) return String(value ?? "").replace(/[0-9]/g, d => "০১২৩৪৫৬৭৮৯"[Number(d)]);
  return `${m[1].padStart(2,"0")}/${m[2].padStart(2,"0")}/${m[3]}`.replace(/[0-9]/g, d => "০১২৩৪৫৬৭৮৯"[Number(d)]);
}
function TODAY_BANGLA(){
  const d=new Date();
  const pad=n=>String(n).padStart(2,"0");
  return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()}`.replace(/[0-9]/g,d=>"০১২৩৪৫৬৭৮৯"[Number(d)]);
}

function bnDateFormat(value){
  let s = norm(value);
  let m = s.match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})$/);
  if(m){
    return [m[1].padStart(2,'0'),m[2].padStart(2,'0'),m[3]].join('/').replace(/[0-9]/g,d=>'০১২৩৪৫৬৭৮৯'[Number(d)]);
  }
  return enToBnNumeral(value || '');
}
function currentBanglaDate(){
  return enToBnNumeral(new Date().toLocaleDateString('en-GB'));
}

function forceBanglaDateDisplay(){
  const issue = document.getElementById('issue-date');
  if(issue){
    const raw = issue.textContent || issue.innerText || '';
    issue.textContent = enToBnNumeral(raw);
  }
  const dob = document.getElementById('out-dob');
  if(dob){
    const raw = dob.textContent || dob.innerText || '';
    dob.textContent = enToBnNumeral(raw);
  }
}

const BN='০১২৩৪৫৬৭৮৯';
const EN='0123456789';
const bnMonths={'জানুয়ারি':1,'জানুয়ারি':1,'ফেব্রুয়ারি':2,'ফেব্রুয়ারি':2,'মার্চ':3,'এপ্রিল':4,'মে':5,'জুন':6,'জুলাই':7,'আগস্ট':8,'সেপ্টেম্বর':9,'অক্টোবর':10,'নভেম্বর':11,'ডিসেম্বর':12};
const enMonths={january:1,february:2,march:3,april:4,may:5,june:6,july:7,august:8,september:9,october:10,november:11,december:12,jan:1,feb:2,mar:3,apr:4,jun:6,jul:7,aug:8,sep:9,sept:9,oct:10,nov:11,dec:12};
function bnToEn(s){return String(s||'').replace(/[০-৯]/g,d=>EN[BN.indexOf(d)]);}
// Different keyboards encode the Bengali "য়" either as a single character
// or as "য" + nukta.  Normalise both forms before matching labels.
function norm(s){return bnToEn(String(s||'')).replace(/&#x20;|&nbsp;/gi,' ').replace(/\u09DF/g,'য়').replace(/[\u200B-\u200D\uFEFF]/g,'').replace(/[\u00A0\u202F]/g,' ').replace(/\r/g,'').replace(/[ \t]+/g,' ').trim();}
function hasBangla(s){return /[\u0980-\u09FF]/.test(s||'');}
function cleanBanglaName(s){
 s=String(s||'').replace(/[\u200B-\u200D\uFEFF]/g,'').trim();
 s=s.replace(/^(?:বাংলায়|বাংলায়|বাংলা|নাম\s*\(বাংলায়\)|নাম\s*\(বাংলায়\)|নাম\s*বাংলায়|নাম\s*বাংলায়|নাম\s*বাংলা|নাম\s*বাংলা|নাম)\s*[ঃ:：=\-–—]?\s*/iu,'');
 s=s.replace(/\s*(?:\(|\[)?\s*(?:ইংরেজি|ইংরেজী|english|en)\s*(?:\)|\])?\s*[:：=\-].*$/i,'');
 s=s.replace(/\([^)]*[A-Za-z][^)]*\)/g,' ');
 s=s.replace(/[“”"'`]/g,' ');
 s=s.replace(/^[\s:：=\-–—•★♦️🗣️]+|[\s:：=\-–—,，.。]+$/g,'');
 s=s.replace(/\s+/g,' ').trim();
 return s;
}
function isBanglaName(s){
 s=cleanBanglaName(s);
 if(!s||!hasBangla(s))return false;
 if(/\d/.test(bnToEn(s)))return false;
 if(/^(?:নাম|জন্ম|জন্ম তারিখ|তারিখ|পিতা|পিতার নাম|মাতা|মাতার নাম|বাবা|বাবার নাম|মা|মায়ের নাম|মায়ের নাম|ঠিকানা|স্থায়ী ঠিকানা|স্থায়ী ঠিকানা|লিঙ্গ|জাতীয়তা|জাতীয়তা|জন্মস্থান|বিভাগ|জেলা|উপজেলা|ইউনিয়ন|ইউনিয়ন|পৌরসভা|ওয়ার্ড|ওয়ার্ড|ডাকঘর|গ্রাম|বাসা|হোল্ডিং|পোস্ট|মোবাইল|এনআইডি|আইডি|নিবন্ধন|তথ্য|পিতার তথ্য|মাতার তথ্য)$/iu.test(s))return false;
 if(/^(?:বাসা|বাড়ি|বাড়ি|গ্রাম|ডাকঘর|পোস্ট অফিস|উপজেলা|জেলা|বিভাগ|ইউনিয়ন|ইউনিয়ন|ওয়ার্ড|ওয়ার্ড)\b/iu.test(s))return false;
 const letters=s.replace(/[^\u0980-\u09FF]/g,'').length;
 return letters>=2 && s.length<=80;
}
function valueAfterLabel(line,labelRe){
 const m=line.match(labelRe); if(!m)return '';
 return cleanBanglaName(m[1]||'');
}
function linesOf(text){return norm(text).split('\n').map(x=>x.trim()).filter(Boolean);}
function stripEnglishTail(s){
 s=s.replace(/\s*\([^)]*[A-Za-z][^)]*\)/g,'');
 s=s.replace(/\s+[A-Za-z][A-Za-z .'-]{1,80}$/,'');
 return s.trim();
}
function extractLabeledBangla(lines, patterns){
 for(let i=0;i<lines.length;i++){
   const line=lines[i];
   for(const re of patterns){
     const m=line.match(re);
     if(m){
       let v=stripEnglishTail(m[1]||'');
       if(isBanglaName(v))return cleanBanglaName(v);
       // Handle labels whose value is only a prefix, e.g. "মোছাঃ" then next line has surname.
       if(/^(?:মোঃ|মো\.|মোছাঃ|মোছা:|মোসাঃ|মোসা:|মোছা|মোসা|শ্রী|শ্রীমতি|কুমার)$/i.test(v)&&lines[i+1]&&isBanglaName(lines[i+1])) return cleanBanglaName(v+' '+lines[i+1]);
       if(!v && lines[i+1]&&isBanglaName(lines[i+1])) return cleanBanglaName(lines[i+1]);
     }
   }
 }
 return '';
}
const childNamePatterns=[
 /^(?:[★*•▪️📋🗣️]\s*)?নাম\s*(?:বাংলা(?:য়|য়)?|বাংলায়|বাংলায়)\s*[ঃ:：=\-–—]\s*(.+)$/iu,
 /^(?:[★*•▪️📋🗣️]\s*)?নাম\s*\(\s*বাংলা(?:য়|য়)?\s*\)\s*[ঃ:：=\-–—]\s*(.+)$/iu,
 /^(?:[★*•▪️📋🗣️]\s*)?নাম\s*[ঃ:：=\-–—]\s*(.+)$/iu,
 /^(?:[★*•▪️📋🗣️]\s*)?নাম\s*বাংলা\s*[ঃ:：=\-–—]\s*(.+)$/iu,
 /^(?:[★*•▪️📋🗣️]\s*)?(?:নামের\s*প্রথম\s*অংশ|নামের\s*শেষ\s*অংশ)\s*\(\s*বাংলা(?:য়|য়)?\s*\)\s*[ঃ:：=\-–—]\s*(.+)$/iu
];

const fatherPatterns=[
 /^(?:[★*•▪️🗣️]\s*)?(?:পিতার নাম|পিতা নাম|বাবার নাম|বাবা নাম|পিতা|বাবা)\s*[ঃ:：=\-]\s*(?:(?:বাংলায়|বাংলায়|বাংলা)\s*[ঃ:：=\-]\s*)?(.+)$/i,
 /^(?:[★*•▪️🗣️]\s*)?নাম\s*(?:বাংলায়|বাংলায়|বাংলা)\s*[ঃ:：=\-]\s*(.+)$/i
];
const motherPatterns=[
 /^(?:[★*•▪️🗣️]\s*)?(?:মাতার নাম|মাতা নাম|মায়ের নাম|মায়ের নাম|মা নাম|মাতা|মা)\s*[ঃ:：=\-]\s*(?:(?:বাংলায়|বাংলায়|বাংলা)\s*[ঃ:：=\-]\s*)?(.+)$/i,
 /^(?:[★*•▪️🗣️]\s*)?নাম\s*(?:বাংলায়|বাংলায়|বাংলা)\s*[ঃ:：=\-]\s*(.+)$/i
];
function extractCompact(text){
 let out={name:'',father:'',mother:''};
 const t=norm(text);
 const compact=t.match(/(?:^|\n)\s*নাম\s*[-:：]\s*([^\n,]+?)\s*,\s*পিতা\s*[-:：]\s*([^\n,]+?)\s*,\s*মাতা\s*[-:：]\s*([^\n,]+?)(?:\s*,|\n|$)/i);
 if(compact){out.name=stripEnglishTail(compact[1]);out.father=stripEnglishTail(compact[2]);out.mother=stripEnglishTail(compact[3]);}
 return out;
}
function parseDateString(raw){
 let s=norm(raw).toLowerCase().replace(/[()\[\]]/g,' ').replace(/\s+/g,' ').trim();
 // Prefer the first date-shaped value in the supplied fragment.
 const num=s.match(/(\d{1,4})\s*[\/.\-]\s*(\d{1,2})\s*[\/.\-]\s*(\d{2,4})/);
 if(num){
   let a=+num[1],b=+num[2],c=+num[3];
   if(a>=1000){return `${String(b).padStart(2,'0')}/${String(c).padStart(2,'0')}/${a}`;}
   if(c<100)return '';
   return `${String(a).padStart(2,'0')}/${String(b).padStart(2,'0')}/${String(c).padStart(4,'0')}`;
 }
 const m=s.match(/(\d{1,2})\s+([a-z]+|[\u0980-\u09FF]+)\s+(\d{4})/i);
 if(m){const key=m[2].toLowerCase();const month=enMonths[key]||bnMonths[m[2]];if(month)return `${String(+m[1]).padStart(2,'0')}/${String(month).padStart(2,'0')}/${m[3]}`;}
 return '';
}
function dateCandidates(text){
 const t=norm(text); const arr=[];
 const re=/(?:\d{1,4}\s*[\/.\-]\s*\d{1,2}\s*[\/.\-]\s*\d{2,4}|\d{1,2}\s+(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?|জানুয়ারি|জানুয়ারি|ফেব্রুয়ারি|ফেব্রুয়ারি|মার্চ|এপ্রিল|মে|জুন|জুলাই|আগস্ট|সেপ্টেম্বর|অক্টোবর|নভেম্বর|ডিসেম্বর)\s+\d{4})/gi;
 let m; while((m=re.exec(t))) arr.push({raw:m[0],date:parseDateString(m[0]),index:m.index});
 return arr.filter(x=>x.date);
}
function extractChildDob(text, childName){
 const t=norm(text);
 const labelRe=/(?:জন্ম\s*তারিখ|জন্মতারিখ|জন্ম-তারিখ|তারিখে?\s*জন্ম|date\s*of\s*birth|date\s*of\s*burth|dob|birth\s*date|জন্মদিন)\s*[:：=\-]?\s*([^\n]{0,100})/giu;
 let m; const candidates=[];
 while((m=labelRe.exec(t))){
   const fragment=m[1]||''; const date=parseDateString(fragment); if(date){
     const start=Math.max(0,m.index-260); const ctx=t.slice(start,m.index+140);
     let score=0;
     if(/(?:পিতার|পিতা|father|বাবা)/i.test(ctx))score-=12;
     if(/(?:মাতার|মাতা|mother|মা)/i.test(ctx))score-=12;
     if(/(?:নিজের|ব্যক্তিগত|নতুন নিবন্ধনের তথ্য|নাম|শিক্ষার্থীর|নিজের তথ্য)/i.test(ctx))score+=4;
     if(childName&&ctx.includes(childName))score+=8;
     candidates.push({date,score,index:m.index});
   }
 }
 // Also scan unlabeled dates, but heavily penalize parent DOB contexts.
 for(const d of dateCandidates(t)){
   const ctx=t.slice(Math.max(0,d.index-180),Math.min(t.length,d.index+80));
   let score=-1;
   if(/(?:পিতার|পিতা|father|বাবা)/i.test(ctx))score-=10;
   if(/(?:মাতার|মাতা|mother|মা)/i.test(ctx))score-=10;
   if(childName&&ctx.includes(childName))score+=8;
   candidates.push({date:d.date,score,index:d.index});
 }
 candidates.sort((a,b)=>b.score-a.score||a.index-b.index);
 return candidates[0]?.date||'';
}
function findNameCandidates(lines){
 const arr=[];
 for(let i=0;i<lines.length;i++){
   const line=stripLeadingDecorations(lines[i]);

   if(/^\s*(?:name|name\s*english|english\s*name)\s*[:：=\-]/iu.test(line)) continue;

   let v='';
   let explicit=false;

   for(const re of childNamePatterns){
     const m=line.match(re);
     if(m){
       v=stripEnglishTail(m[1]||'');
       explicit=true;
       break;
     }
   }

   if(v && isBanglaName(v)){
     arr.push({value:cleanBanglaName(v),i,score:30});
     continue;
   }

   if(explicit && !v && lines[i+1] && isBanglaName(lines[i+1])){
     arr.push({value:cleanBanglaName(lines[i+1]),i,score:28});
     continue;
   }

   if(!explicit && isBanglaName(line) && i<lines.length-1){
     const around=lines.slice(i,Math.min(lines.length,i+7)).join(' ');
     if(/(?:জন্ম\s*তারিখ|date\s*of\s*birth|পিতার|পিতা|মাতার|মাতা|father|mother)/iu.test(around)){
       arr.push({value:cleanBanglaName(line),i,score:5});
     }
   }
 }
 return arr;
}
function extractRegistrationName(lines){
  let first='', last='', firstIndex=-1;
  for(let i=0;i<lines.length;i++){
    const m=lines[i].match(/নামের\s*(প্রথম|শেষ)\s*অংশ\s*\(\s*বাংলা(?:য়|য়)?\s*\)\s*[ঃ:：=\-–—]\s*(.+)$/iu);
    if(!m) continue;
    const value=cleanBanglaName(stripEnglishTail(m[2]||''));
    if(!isBanglaName(value)) continue;
    if(m[1]==='প্রথম'){first=value;firstIndex=i;}
    else {last=value; if(firstIndex<0) firstIndex=i;}
  }
  return first||last ? {value:[first,last].filter(Boolean).join(' '),i:Math.max(0,firstIndex),score:60} : null;
}
function extractPlainRecord(lines){
  // Simple copy/paste blocks often contain no labels, e.g. Bengali name,
  // English name, DOB, then the father's and mother's Bengali/English names.
  let dob='', dobIndex=-1;
  for(let i=0;i<lines.length;i++){
    const parsed=parseDateString(lines[i]);
    if(parsed){dob=parsed;dobIndex=i;break;}
  }
  if(dobIndex<0) return null;

  let name='';
  for(let i=dobIndex-1;i>=Math.max(0,dobIndex-4);i--){
    if(isBanglaName(lines[i])){name=cleanBanglaName(lines[i]);break;}
  }
  const parentNames=[];
  for(let i=dobIndex+1;i<lines.length-1 && parentNames.length<2;i++){
    if(isBanglaName(lines[i]) && /^[A-Za-z][A-Za-z .'-]*$/.test(norm(lines[i+1]))){
      parentNames.push(cleanBanglaName(lines[i]));
    }
  }
  return name ? {name,father:parentNames[0]||'',mother:parentNames[1]||'',dob,score:parentNames.length===2?105:60} : null;
}
function roleStartIndex(lines){
  for(let i=0;i<lines.length;i++){
    if(/(?:পিতার|পিতা|বাবার|বাবা|father|মাতার|মাতা|মায়ের|mother)/iu.test(lines[i]) && !/বাবা\s*[-–—]\s*মা(?:য়ের|য়ের)/iu.test(lines[i])) return i;
  }
  return lines.length;
}
function valueOnOrAfter(lines,i){
  const line=lines[i]||'';
  // Preserve name prefixes such as "মোঃ". Only remove delimiters that
  // belong to the label, not every colon in the whole line.
  const firstDelimiter=line.search(/[ঃ:：=]/);
  let payload=firstDelimiter>=0 ? line.slice(firstDelimiter+1) : '';
  payload=payload
    .replace(/^\s*(?:বাংলা(?:য়|য়)?|বাংলায়|বাংলায়|bangla)\s*[ঃ:：=]\s*/iu,'')
    .replace(/^\s*(?:ইংরেজি|ইংরেজী|ইংরেজিতে|ইংরেজিতেঃ)\s*[ঃ:：=]\s*/iu,'');
  const candidate=cleanBanglaName(stripEnglishTail(payload));
  if(isBanglaName(candidate)) return candidate;
  for(let j=i+1;j<Math.min(lines.length,i+4);j++){
    if(/(?:জন্ম|লিঙ্গ|ঠিকানা|নাম\s*(?:ইং|english)|date|birth)/iu.test(lines[j])) continue;
    if(isBanglaName(lines[j])) return cleanBanglaName(lines[j]);
  }
  return '';
}
function extractRoleAwareRecord(lines){
  const parentStart=roleStartIndex(lines);
  let name='', father='', mother='', dob='';

  // Child name and DOB are selected only before the first parent's block.
  for(let i=0;i<parentStart;i++){
    const line=lines[i];
    if(!name && /(?:নাম|name)/iu.test(line) && !/(?:ইংরেজ|english)/iu.test(line)){
      name=valueOnOrAfter(lines,i);
    }
    if(!dob && /(?:জন্ম\s*তারিখ|জন্মতারিখ|date\s*of\s*birth|data\s*of\s*birth|birth\s*date|\bbirth\b|\bdob\b)/iu.test(line)){
      dob=parseDateString(line);
    }
  }

  // Label-free input: the first Bengali name before the first DOB is child.
  if(!name){
    for(let i=0;i<parentStart;i++){
      if(parseDateString(lines[i])){
        for(let j=i-1;j>=Math.max(0,i-4);j--) if(isBanglaName(lines[j])){name=cleanBanglaName(lines[j]);break;}
        if(!dob) dob=parseDateString(lines[i]);
        break;
      }
    }
  }
  if(!dob){
    for(let i=0;i<parentStart;i++){
      const candidate=parseDateString(lines[i]);
      if(candidate){dob=candidate;break;}
    }
  }

  let role='';
  for(let i=parentStart;i<lines.length;i++){
    const line=lines[i];
    if(/(?:পিতার|পিতা|বাবার|বাবা|father)\s*(?:তথ্য|নাম|name)?/iu.test(line)) role='father';
    else if(/(?:মাতার|মাতা|মায়ের|mother)\s*(?:তথ্য|নাম|name)?/iu.test(line)) role='mother';

    // A generic "নাম বাংলায়" within a parent section belongs to that role.
    if(role && /(?:নাম|name)/iu.test(line) && !/(?:ইংরেজ|english)/iu.test(line)){
      const value=valueOnOrAfter(lines,i);
      if(value){if(role==='father'&&!father)father=value;if(role==='mother'&&!mother)mother=value;}
    }
    // Direct labels, including "পিতার নাম: ..." and "Mother's Name: ...".
    if(!father && /^(?:[★*•▪️🗣️💠]\s*)?(?:পিতার\s*নাম|পিতা\s*নাম|বাবার\s*নাম|বাবা(?!\s*[-–—])|father(?:'?s)?\s*name)(?:\s*\((?:বাংলা(?:য়|য়)?|english|en|bn)\))?\s*[ঃ:：=\-–—]/iu.test(line)) father=valueOnOrAfter(lines,i);
    if(!mother && /^(?:[★*•▪️🗣️💠]\s*)?(?:মাতার\s*নাম|মাতা\s*নাম|মায়ের\s*নাম|mother(?:'?s)?\s*name|mother)(?:\s*\((?:বাংলা(?:য়|য়)?|english|en|bn)\))?\s*[ঃ:：=\-–—]/iu.test(line)) mother=valueOnOrAfter(lines,i);
  }
  return name ? {name,father,mother,dob,score:(father||mother?150:50)+(father?25:0)+(mother?25:0)+(dob?25:0)} : null;
}
function extractParentBySection(lines,type,startIndex){
 const isFather=type==='father';

 const rolePatterns=isFather ? [
   /^(?:[★*•▪️🗣️💠]\s*)?পিতার\s*নাম\s*[ঃ:：=\-–—]\s*(.+)$/iu,
   /^(?:[★*•▪️🗣️💠]\s*)?পিতা\s*নাম\s*[ঃ:：=\-–—]\s*(.+)$/iu,
   /^(?:[★*•▪️🗣️💠]\s*)?বাবার\s*নাম\s*[ঃ:：=\-–—]\s*(.+)$/iu,
   /^(?:[★*•▪️🗣️💠]\s*)?পিতা\s*[ঃ:：=\-–—]\s*(.+)$/iu,
   /^(?:[★*•▪️🗣️💠]\s*)?বাবা\s*[ঃ:：=\-–—]\s*(.+)$/iu
 ] : [
   /^(?:[★*•▪️🗣️💠]\s*)?মাতার\s*নাম\s*[ঃ:：=\-–—]\s*(.+)$/iu,
   /^(?:[★*•▪️🗣️💠]\s*)?মাতা\s*নাম\s*[ঃ:：=\-–—]\s*(.+)$/iu,
   /^(?:[★*•▪️🗣️💠]\s*)?মায়ের\s*নাম\s*[ঃ:：=\-–—]\s*(.+)$/iu,
   /^(?:[★*•▪️🗣️💠]\s*)?মায়ের\s*নাম\s*[ঃ:：=\-–—]\s*(.+)$/iu,
   /^(?:[★*•▪️🗣️💠]\s*)?মাতা\s*[ঃ:：=\-–—]\s*(.+)$/iu,
   /^(?:[★*•▪️🗣️💠]\s*)?মা\s*[ঃ:：=\-–—]\s*(.+)$/iu
 ];

 const otherLabel=isFather
   ? /^(?:[★*•▪️🗣️💠]\s*)?(?:মাতার\s*নাম|মাতা\s*নাম|মায়ের\s*নাম|মায়ের\s*নাম|মাতা|মা)\s*[ঃ:：=\-–—]/iu
   : /^(?:[★*•▪️🗣️💠]\s*)?(?:পিতার\s*নাম|পিতা\s*নাম|বাবার\s*নাম|পিতা|বাবা)\s*[ঃ:：=\-–—]/iu;

 // Search from the student's record, not from the beginning of the
 // whole pasted document. This prevents a previous record's parent
 // from being selected.
 for(let i=Math.max(0,startIndex||0); i<lines.length; i++){
   for(const re of rolePatterns){
     const m=lines[i].match(re);
     if(!m) continue;

     let v=stripEnglishTail(m[1]||'');
     if(isBanglaName(v)) return cleanBanglaName(v);

     if(!v && lines[i+1] && isBanglaName(lines[i+1])){
       return cleanBanglaName(lines[i+1]);
     }
   }

   // Section form:
   // ♦️পিতার তথ্য♦️
   // নাম বাংলায়ঃ ...
   if(
     isFather
       ? /^.*পিতার\s*তথ্য.*$/iu.test(lines[i])
       : /^.*মাতার\s*তথ্য.*$/iu.test(lines[i])
   ){
     for(let j=i+1;j<Math.min(lines.length,i+8);j++){
       if(otherLabel.test(lines[j])) break;

       const m=lines[j].match(
         /^(?:[★*•▪️🗣️💠]\s*)?নাম\s*(?:বাংলা(?:য়|য়)?|বাংলায়|বাংলায়)\s*[ঃ:：=\-–—]\s*(.+)$/iu
       );

       if(m){
         const v=stripEnglishTail(m[1]||'');
         if(isBanglaName(v)) return cleanBanglaName(v);
       }
     }
   }
 }

 return '';
}

function stripLeadingDecorations(value){
  // Remove emoji, bullets, invisible formatting marks and other decoration
  // before parsing labels. This handles 🗣️, ♦️, ★ and copied Unicode marks.
  return String(value||'')
    .replace(/^[^\p{L}\p{N}]*/u,'')
    .trim();
}

function isEnglishName(value){
  const v=String(value||'').replace(/&#x20;|&nbsp;/gi,' ').replace(/[“”"'`]/g,'').trim();
  if(!/^[A-Za-z][A-Za-z .\-]{1,80}$/.test(v) || /\d/.test(v)) return false;
  return !/^(?:name|english|gender|female|male|birth|date|address|village|place|father|mother|permanent|bangladesh)$/i.test(v);
}
function englishValueOnOrAfter(lines,i){
  const line=norm(lines[i]||'');
  const delimiter=line.search(/[ঃ:：=]/);
  let payload=delimiter>=0 ? line.slice(delimiter+1) : '';
  payload=payload.replace(/^\s*(?:name\s*english|english\s*name|নাম\s*ইংরেজি(?:তে|তেঃ)?|ইংরেজি(?:তে|তেঃ)?)\s*[ঃ:：=]?\s*/iu,'').trim();
  if(isEnglishName(payload)) return payload;
  for(let j=i+1;j<Math.min(lines.length,i+4);j++){
    const candidate=norm(lines[j]);
    if(isEnglishName(candidate)) return candidate;
  }
  return '';
}

/*
 * Unlabelled mixed Bangla/English format
 * Example:
 *   বাংলা child name
 *   ENGLISH CHILD NAME
 *   26/08/2007
 *   3rd Child
 *   Female
 *   বাংলা father name
 *   ENGLISH FATHER NAME
 *   বাংলা mother name
 *   ENGLISH MOTHER NAME
 *
 * This format has no "Father's Name:" / "Mother's Name:" labels,
 * so the parser must use the Bengali/English name pairing and position.
 */
function extractUnlabelledPairedRecord(lines){
  const result = {
    enName:'',
    enFather:'',
    enMother:'',
    enGender:''
  };

  // Find the child's DOB first. This gives us a reliable boundary.
  let dobIndex = -1;
  for(let i=0;i<lines.length;i++){
    if(parseDateString(lines[i])){
      dobIndex = i;
      break;
    }
  }

  // Gender can be anywhere in the short personal-information block.
  for(const line of lines){
    const g = toEnglishGender(line);
    if(g){
      result.enGender = g;
      break;
    }
  }

  // 1) Child Bengali + English pair before/around DOB.
  if(dobIndex >= 0){
    for(let i=0;i<dobIndex;i++){
      if(isBanglaName(lines[i])){
        for(let j=i+1;j<=Math.min(dobIndex,i+2);j++){
          if(isEnglishName(lines[j])){
            result.enName = norm(lines[j]);
            break;
          }
        }
        if(result.enName) break;
      }
    }

    // If the pair is not adjacent, use the first English name before DOB.
    if(!result.enName){
      for(let i=0;i<dobIndex;i++){
        if(isEnglishName(lines[i])){
          result.enName = norm(lines[i]);
          break;
        }
      }
    }
  }

  // 2) Parent Bengali + English pairs after the child's DOB/personal block.
  // We only accept a Bengali name immediately followed by an English name.
  const parentPairs = [];
  const start = dobIndex >= 0 ? dobIndex + 1 : 0;

  for(let i=start;i<lines.length-1;i++){
    if(!isBanglaName(lines[i])) continue;

    // Skip a Bengali line if it is actually an address/label-like value.
    if(/(?:গ্রাম|ডাকঘর|পোস্ট|উপজেলা|জেলা|বিভাগ|ইউনিয়ন|ওয়ার্ড|ঠিকানা|মোবাইল|জাতীয়তা|জন্মস্থান)/iu.test(lines[i])){
      continue;
    }

    for(let j=i+1;j<=Math.min(lines.length-1,i+2);j++){
      if(isEnglishName(lines[j])){
        parentPairs.push({
          bn:norm(lines[i]),
          en:norm(lines[j]),
          index:i
        });
        i=j;
        break;
      }
    }

    if(parentPairs.length>=2) break;
  }

  if(parentPairs[0]) result.enFather = parentPairs[0].en;
  if(parentPairs[1]) result.enMother = parentPairs[1].en;

  return result;
}


function isEnglishName(value){
  let v=stripLeadingDecorations(norm(value))
    .replace(/[“”"'`]/g,'')
    .trim();

  // Remove common field labels accidentally left in the value.
  v=v.replace(/^(?:name|father|father'?s\s*name|mother|mother'?s\s*name|english\s*name)\s*[:：=ঃ\-–—]\s*/i,'');
  v=v.replace(/^(?:mst|md|mr|mrs|ms|miss)\s*[:：]\s*/i, '$1 ');

  // Names may legitimately contain initials/prefixes such as:
  // Mst. Hafija Begum, Md. Jahurul Islam, U. K. Monowara Begum.
  // Keep dots, but reject a line that is only a field word.
  if(!/^[A-Za-z][A-Za-z .'\-]{1,100}$/.test(v) || /\d/.test(v)) return false;

  const words=v.split(/\s+/).filter(Boolean);
  if(words.length < 2) return false;

  return !/^(?:name|english|gender|female|male|birth|date|of|address|village|place|father|mother|permanent|bangladesh|bangladeshi|division|district|upazila|union|ward|post|office|sex|data)$/i.test(v);
}

function englishValueOnOrAfter(lines,i){
  const line=norm(lines[i]||'');
  const delimiter=line.search(/[ঃ:：=]/);

  // Labels may use "-" without a colon, e.g. NAME- KAKULI MARMA.
  let payload=delimiter>=0
    ? line.slice(delimiter+1)
    : line.replace(
        /^(?:name|name\s*english|english\s*name|father|father'?s\s*name|mother|mother'?s\s*name|mother|fathers\s*name|mothers\s*name)\s*[-–—]\s*/iu,
        ''
      );

  payload=payload
    .replace(/^\s*(?:name\s*english|english\s*name|father|mother|fathers\s*name|mothers\s*name)\s*[ঃ:：=\-–—]?\s*/iu,'')
    .trim();

  if(isEnglishName(payload)) return payload;

  for(let j=i+1;j<Math.min(lines.length,i+5);j++){
    const candidate=norm(lines[j]);
    if(isEnglishName(candidate)) return candidate;
    // Stop before a new labelled field.
    if(/^(?:date|dob|gender|লিঙ্গ|জন্ম|পিতা|মাতা|father|mother|address|village|place)/iu.test(candidate)) break;
  }
  return '';
}

function looksLikeEnglishField(line){
  return /(?:^|\s)(?:name|father|father'?s\s*name|mother|mother'?s\s*name|fathers?\s*name|mothers?\s*name|date\s*of\s*birth|dob|birth|place\s*of\s*birth|gender|sex)\s*[:：=ঃ\-–—]/iu.test(line);
}

function isGenderLine(line){
  return /(?:gender|sex|লিঙ্গ|পুরুষ\/নারী|পুরুষ\s*\/\s*নারী|নারী|মহিলা|মেয়ে|মেয়ে|পুরুষ)/iu.test(line);
}

function extractGenderFromLines(lines){
  for(const line of lines){
    const g=toEnglishGender(line);
    if(g) return g;
  }
  return '';
}

function findChildEnglishName(lines, endIndex){
  const end=Math.min(endIndex ?? lines.length, lines.length);

  for(let i=0;i<end;i++){
    const line=stripLeadingDecorations(lines[i]);

    // Supports:
    // Name : Mst. Hafija Begum
    // নাম: ইংরেজি:Mst Umme Najifa
    // নাম : ইংরেজী: Mst. ...
    const mixed=line.match(
      /^(?:[★*•▪️🗣️💠]\s*)?নাম\s*[:：]\s*(?:ইংরেজি|ইংরেজী|ইংরেজিতে|ইংরেজিতেঃ)\s*[:：=ঃ\-–—]\s*(.+)$/iu
    );
    if(mixed){
      const v=norm(mixed[1]);
      if(isEnglishName(v)) return v;
    }

    if(/^(?:[★*•▪️🗣️💠]\s*)?(?:name|name\s*english|english\s*name|name\s*in\s*english)\s*[:：=ঃ\-–—]/iu.test(line)){
      const v=englishValueOnOrAfter(lines,i);
      if(v) return v;
    }

    if(/(?:নাম\s*ইংরেজি|নাম\s*ইংরেজিতে|নাম\s*ইংরেজিতেঃ|ইংরেজী|ইংরেজি)\s*[ঃ:：=\-–—]/iu.test(line)){
      const v=englishValueOnOrAfter(lines,i);
      if(v) return v;
    }
  }

  // Label-free: Bengali name followed by English name.
  for(let i=0;i<end-1;i++){
    if(!isBanglaName(lines[i])) continue;
    for(let j=i+1;j<=Math.min(end-1,i+3);j++){
      if(isEnglishName(lines[j])) return lines[j];
      if(parseDateString(lines[j])) break;
    }
  }

  for(let i=0;i<end;i++){
    if(isEnglishName(lines[i])) return lines[i];
  }

  return '';
}

function findChildBanglaName(lines, endIndex){
  const end=Math.min(endIndex ?? lines.length, lines.length);

  // Registration format: first/last part.
  const reg=extractRegistrationName(lines.slice(0,end));
  if(reg?.value) return reg.value;

  // Explicit child labels.
  for(let i=0;i<end;i++){
    const line=stripLeadingDecorations(lines[i]);

    for(const re of childNamePatterns){
      const m=line.match(re);
      if(m){
        const v=stripEnglishTail(m[1]||'');
        if(isBanglaName(v)) return cleanBanglaName(v);
        if(!v && lines[i+1] && isBanglaName(lines[i+1])) return cleanBanglaName(lines[i+1]);
      }
    }

    // Nested label variants:
    // নাম:বাংলায় : মোছা : উম্মে নাজিফা
    // নাম : বাংলায়: ...
    const nested=line.match(/^(?:[★*•▪️🗣️💠]\s*)?নাম\s*[ঃ:：]\s*(?:বাংলা(?:য়|য়)?|বাংলায়|বাংলায়)\s*[ঃ:：=\-–—]\s*(.+)$/iu);
    if(nested){
      const v=stripEnglishTail(nested[1]||'');
      if(isBanglaName(v)) return cleanBanglaName(v);
    }

    // Common variants:
    // নাম- কাকুলী মারমা
    // নামঃ মোঃ ...
    // নাম : ...
    const generic=line.match(/^(?:[★*•▪️🗣️💠]\s*)?নাম\s*[ঃ:：=\-–—]\s*(.+)$/iu);
    if(generic){
      const v=stripEnglishTail(generic[1]||'');
      if(isBanglaName(v)) return cleanBanglaName(v);
    }
  }

  return '';
}

function findDobBefore(lines, endIndex){
  const end=Math.min(endIndex ?? lines.length, lines.length);

  // Explicit DOB labels first.
  for(let i=0;i<end;i++){
    const line=lines[i];
    if(/(?:জন্ম\s*তারিখ|জন্মতারিখ|date\s*of\s*birth|data\s*of\s*birth|dob|birth\s*date|date\s*of\s*burth|জন্মদিন)\s*[:：=ঃ\-–—]?\s*/iu.test(line)){
      const d=parseDateString(line);
      if(d) return d;
      if(lines[i+1]){
        const d2=parseDateString(lines[i+1]);
        if(d2) return d2;
      }
    }
  }

  // First date before parent section.
  for(let i=0;i<end;i++){
    const d=parseDateString(lines[i]);
    if(d) return d;
  }

  return '';
}

function findChildBoundary(lines, childIndex){
  // Find the first parent section after the child.
  for(let i=childIndex+1;i<lines.length;i++){
    if(/(?:পিতার\s*(?:তথ্য|নাম)|মাতার\s*(?:তথ্য|নাম)|father'?s?\s*name|mother'?s?\s*name|^father\b|^mother\b)/iu.test(lines[i])){
      return i;
    }
  }
  return lines.length;
}

function findNextRecordBoundary(lines, startIndex){
  // A new record usually starts with a labelled Bengali/English name,
  // a registration heading, or a clear label-free Bengali+English pair.
  for(let i=startIndex+1;i<lines.length;i++){
    if(/(?:নতুন নিবন্ধনের তথ্য|জন্ম নিবন্ধনের জন্য চাহিত তথ্য|নতুন\s*নিবন্ধন)/iu.test(lines[i])){
      return i;
    }

    if(/^(?:নাম|নামঃ|নাম:|নাম বাংলা|নাম বাংলায়|নাম বাংলা :)/iu.test(lines[i]) && !/(?:পিতা|মাতা|father|mother)/iu.test(lines[i])){
      return i;
    }

    if(/^(?:name|name english|english name)\s*[:：=\-]/iu.test(lines[i])){
      return i;
    }
  }
  return lines.length;
}

function extractParentPairInRange(lines, type, start, end){
  const isFather=type==='father';
  const endSafe=Math.min(end,lines.length);

  const directPatterns=isFather ? [
    /^(?:[★*•▪️🗣️💠]\s*)?(?:পিতার\s*নাম|পিতা\s*নাম|বাবার\s*নাম|পিতা|বাবা(?!\s*[-–—]))(?:\s*\((?:বাংলা(?:য়|য়)?|bn)\))?\s*[ঃ:：=\-–—]\s*(.+)$/iu,
    /^(?:[★*•▪️🗣️💠]\s*)?father(?:'?s)?\s*name(?:\s*\((?:english|en)\))?\s*[ঃ:：=\-–—]\s*(.+)$/iu,
    /^(?:[★*•▪️🗣️💠]\s*)?father\s*[ঃ:：=\-–—]\s*(.+)$/iu
  ] : [
    /^(?:[★*•▪️🗣️💠]\s*)?(?:মাতার\s*নাম|মাতা\s*নাম|মায়ের\s*নাম|মা\s*নাম|মাতা|মা)(?:\s*\((?:বাংলা(?:য়|য়)?|bn)\))?\s*[ঃ:：=\-–—]\s*(.+)$/iu,
    /^(?:[★*•▪️🗣️💠]\s*)?mother(?:'?s)?\s*name(?:\s*\((?:english|en)\))?\s*[ঃ:：=\-–—]\s*(.+)$/iu,
    /^(?:[★*•▪️🗣️💠]\s*)?mother\s*[ঃ:：=\-–—]\s*(.+)$/iu
  ];

  const englishLabel=isFather
    ? /^(?:father(?:'?s)?\s*name|father|fathers?\s*name)(?:\s*\((?:english|en)\))?\s*[ঃ:：=\-–—]\s*(.+)$/iu
    : /^(?:mother(?:'?s)?\s*name|mother|mothers?\s*name)(?:\s*\((?:english|en)\))?\s*[ঃ:：=\-–—]\s*(.+)$/iu;

  let banglaValue='';
  let banglaIndex=-1;

  for(let i=Math.max(0,start);i<endSafe;i++){
    const line=norm(lines[i]);
    const lineClean=line.replace(/^[★*•▪️🗣️💠]+\s*/,'').trim();

    // Direct English parent label is always authoritative.
    const em=lineClean.match(englishLabel);
    if(em && isEnglishName(em[1])){
      return {en:em[1].trim(), index:i, bn:banglaValue||''};
    }

    for(const re of directPatterns){
      const m=line.match(re);
      if(!m) continue;

      const raw=m[1]||'';
      const bn=stripEnglishTail(raw);

      if(isBanglaName(bn)){
        banglaValue=cleanBanglaName(bn);
        banglaIndex=i;

        // Search forward for the matching English parent label or
        // an unlabeled English line. Do not stop merely because a
        // DOB/NID line appears between the two.
        for(let j=i+1;j<Math.min(endSafe,i+12);j++){
          const next=norm(lines[j]);

          const labeled=next.match(englishLabel);
          if(labeled && isEnglishName(labeled[1])){
            return {bn:banglaValue,en:labeled[1].trim(),index:i};
          }

          if(isEnglishName(next) && !looksLikeEnglishField(next)){
            return {bn:banglaValue,en:next,index:i};
          }
        }

        return {bn:banglaValue,index:banglaIndex};
      }

      if(isEnglishName(raw)){
        return {en:norm(raw),index:i};
      }
    }

    // Section format.
    const sectionRe=isFather ? /পিতার\s*তথ্য/iu : /মাতার\s*তথ্য/iu;
    if(sectionRe.test(line)){
      const sectionEnd=Math.min(endSafe,i+20);

      for(let j=i+1;j<sectionEnd;j++){
        if(isFather && /মাতার\s*তথ্য/iu.test(lines[j])) break;
        if(!isFather && /পিতার\s*তথ্য/iu.test(lines[j])) break;

        if(/নাম\s*(?:বাংলা|বাংলায়|বাংলায়|বাংলাতেঃ|বাংলাতে)\s*[ঃ:：=\-–—]/iu.test(lines[j]) ||
           /^(?:[★*•▪️🗣️💠]\s*)?নাম\s*[ঃ:：=\-–—]/iu.test(lines[j])){
          const v=valueOnOrAfter(lines,j);
          if(v){
            let en='';
            for(let k=j+1;k<Math.min(sectionEnd,j+12);k++){
              const next=norm(lines[k]);
              const nextClean=stripLeadingDecorations(next);
              const labeled=nextClean.match(/^(?:name\s*english|english\s*name|নাম\s*ইংরেজি(?:তে|তেঃ|তে)?|নাম\s*ইংরেজিতেঃ|father(?:'?s)?\s*name|mother(?:'?s)?\s*name|father|mother)\s*[ঃ:：=\-–—]\s*(.+)$/iu);
              const nestedEnglish=nextClean.match(/^নাম\s*[:：]\s*(?:ইংরেজি|ইংরেজী|ইংরেজিতে|ইংরেজিতেঃ)\s*[ঃ:：=\-–—]\s*(.+)$/iu);
              if(nestedEnglish && isEnglishName(nestedEnglish[1])) { en=nestedEnglish[1].trim(); break; }
              if(labeled && isEnglishName(labeled[1])) { en=labeled[1].trim(); break; }
              if(isEnglishName(next) && !looksLikeEnglishField(next)) { en=next; break; }
            }
            return {bn:v,en,index:j};
          }
        }
      }
    }
  }

  return {};
}

function extractUnlabelledPairedRecord(lines, boundary){
  const result={enName:'',enFather:'',enMother:'',enGender:''};
  const end=Math.min(boundary ?? lines.length, lines.length);

  // Find child DOB and its index.
  let dobIndex=-1;
  for(let i=0;i<end;i++){
    if(parseDateString(lines[i])){
      dobIndex=i;
      break;
    }
  }

  result.enGender=extractGenderFromLines(lines.slice(0, end));

  // Child pair: Bengali name -> English name, before DOB.
  if(dobIndex>=0){
    for(let i=0;i<dobIndex;i++){
      if(!isBanglaName(lines[i])) continue;

      for(let j=i+1;j<=Math.min(dobIndex-1,i+3);j++){
        if(isEnglishName(lines[j])){
          result.enName=lines[j];
          break;
        }
      }
      if(result.enName) break;
    }
  }

  // Parent pairs after DOB. Stop at address fields or next record.
  const parentPairs=[];
  const start=dobIndex>=0 ? dobIndex+1 : 0;

  for(let i=start;i<end-1;i++){
    if(!isBanglaName(lines[i])) continue;

    // Do not treat address components as parent names.
    if(/(?:গ্রাম|ডাকঘর|পোস্ট|উপজেলা|জেলা|বিভাগ|ইউনিয়ন|ইউনিয়ন|ওয়ার্ড|ওয়ার্ড|ঠিকানা|জন্মস্থান|স্থায়ী|স্থায়ী|মোবাইল|বাড়ি|বাড়ি|হোল্ডিং)/iu.test(lines[i])) continue;

    for(let j=i+1;j<=Math.min(end-1,i+3);j++){
      if(isEnglishName(lines[j])){
        parentPairs.push({bn:lines[i],en:lines[j]});
        i=j;
        break;
      }

      // Do not cross a labelled field while looking for the English pair.
      if(looksLikeEnglishField(lines[j]) || /(?:জন্ম|লিঙ্গ|ঠিকানা|গ্রাম|ডাকঘর|উপজেলা|জেলা|বিভাগ)/iu.test(lines[j])) break;
    }

    if(parentPairs.length>=2) break;
  }

  if(parentPairs[0]) result.enFather=parentPairs[0].en;
  if(parentPairs[1]) result.enMother=parentPairs[1].en;

  return result;
}

function extractEnglishRecord(lines){
  // Determine the child boundary from the first parent label.
  const firstParent=roleStartIndex(lines);
  const childEnd=firstParent < lines.length ? firstParent : lines.length;

  let name=findChildEnglishName(lines, childEnd);
  let gender=extractGenderFromLines(lines.slice(0, childEnd));

  let father='',mother='';

  // Explicit parent labels, including FATHER-/MOTHER-.
  const fatherStart=firstParent < lines.length ? firstParent : 0;
  const recordEnd=findNextRecordBoundary(lines, fatherStart);

  const f=extractParentPairInRange(lines,'father',fatherStart,recordEnd);
  const m=extractParentPairInRange(lines,'mother',fatherStart,recordEnd);

  if(f?.en) father=f.en;
  if(m?.en) mother=m.en;

  // Label-free paired format.
  const paired=extractUnlabelledPairedRecord(lines,recordEnd);

  if(!name && paired.enName) name=paired.enName;
  if(!father && paired.enFather) father=paired.enFather;
  if(!mother && paired.enMother) mother=paired.enMother;
  if(!gender && paired.enGender) gender=paired.enGender;

  return {
    enName:name||'',
    enFather:father||'',
    enMother:mother||'',
    enGender:gender||''
  };
}

function toEnglishGender(value){
  const s=norm(value).toLowerCase();

  // Check female first. A missing boundary must never turn "female"
  // into "male".
  if(/(?:\bfemale\b|নারী|মহিলা|মেয়ে|মেয়ে|মহিলা\s*লিঙ্গ)/iu.test(s)) return 'Female';
  if(/(?:\bmale\b|পুরুষ|ছেলে|পুরুষ\s*লিঙ্গ)/iu.test(s)) return 'Male';

  return '';
}

function chooseRecord(text){
  const lines=linesOf(text);
  const compact=extractCompact(text);
  const names=findNameCandidates(lines);

  // Add label-free child names found around the first DOB.
  const firstDateIndex=lines.findIndex(x=>!!parseDateString(x));
  if(firstDateIndex>=0){
    for(let i=Math.max(0,firstDateIndex-4);i<firstDateIndex;i++){
      if(isBanglaName(lines[i])){
        if(!names.some(n=>n.value===cleanBanglaName(lines[i]))){
          names.push({value:cleanBanglaName(lines[i]),i,score:40});
        }
      }
    }
  }

  const registrationName=extractRegistrationName(lines);
  if(registrationName) names.unshift(registrationName);

  const records=[];

  for(const n of names){
    const parentStart=findChildBoundary(lines,n.i);
    const end=findNextRecordBoundary(lines,parentStart);

    const fatherInfo=extractParentPairInRange(lines,'father',parentStart,end);
    const motherInfo=extractParentPairInRange(lines,'mother',parentStart,end);

    const block=lines.slice(Math.max(0,n.i-3),Math.min(lines.length,end));
    const blockText=block.join('\n');

    const dob=findDobBefore(block, parentStart-n.i>0 ? parentStart-n.i : block.length) ||
              extractChildDob(blockText,n.value);

    const paired=extractUnlabelledPairedRecord(block,block.length);

    const father=fatherInfo.bn || '';
    const mother=motherInfo.bn || '';

    let score=n.score;
    if(father) score+=30;
    if(mother) score+=30;
    if(dob) score+=25;
    if(/(?:নতুন নিবন্ধনের তথ্য|জন্ম নিবন্ধনের জন্য চাহিত তথ্য|পূর্বে নিবন্ধন)/iu.test(blockText)) score+=15;

    records.push({
      name:n.value,
      father,
      mother,
      dob,
      score,
      enName:paired.enName||'',
      enFather:paired.enFather||'',
      enMother:paired.enMother||'',
      enGender:paired.enGender||''
    });
  }

  // Label-free compact record.
  const plain=extractPlainRecord(lines);
  if(plain) records.push(plain);

  if(compact.name){
    const dob=extractChildDob(text,compact.name);
    records.push({
      name:cleanBanglaName(compact.name),
      father:cleanBanglaName(compact.father),
      mother:cleanBanglaName(compact.mother),
      dob,
      score:80+(dob?25:0)
    });
  }

  // Strong fallback for a simple unlabelled block.
  const plainPair=extractPlainRecord(lines);
  if(plainPair && !records.some(r=>r.name===plainPair.name)) records.push(plainPair);

  // Strong labelled-record parser. This handles formats such as:
  // ♦নতুন নিবন্ধনের তথ্য♦
  // ★নাম বাংলায়ঃ ...
  // ♦পিতার তথ্য♦
  // ★নাম বাংলায়ঃ ...
  // ♦মাতার তথ্য♦
  // ★নাম বাংলায়ঃ ...
  const hasStrongLabelFormat = /(?:নতুন\s*নিবন্ধনের\s*তথ্য|জন্ম\s*নিবন্ধনের\s*জন্য\s*চাহিত\s*তথ্য|নামের\s*প্রথম\s*অংশ|নাম\s*বাংলা(?:য়|য়)?\s*[ঃ:：=\-]|নাম\s*\(\s*বাংলা)/iu.test(text);

  if(hasStrongLabelFormat){
    const roleAware=extractRoleAwareRecord(lines);
    if(roleAware && roleAware.name){
      records.push({
        ...roleAware,
        enName:'',
        enFather:'',
        enMother:'',
        enGender:extractGenderFromLines(lines.slice(0, Math.max(1, roleStartIndex(lines))))
      });
    }
  }

  records.sort((a,b)=>(b.score||0)-(a.score||0));

  const best=records[0]||{
    name:'',father:'',mother:'',dob:'',score:0,
    enName:'',enFather:'',enMother:'',enGender:''
  };

  const explicitEnglish=extractEnglishRecord(lines);

  return {
    ...best,
    enName:explicitEnglish.enName || best.enName || '',
    enFather:explicitEnglish.enFather || best.enFather || '',
    enMother:explicitEnglish.enMother || best.enMother || '',
    enGender:explicitEnglish.enGender || best.enGender || ''
  };
}
function calculateAge(dob){
 const m=dob.match(/^(\d{2})\/(\d{2})\/(\d{4})$/); if(!m)return '';
 const d=new Date(+m[3],+m[2]-1,+m[1]); if(Number.isNaN(d.getTime()))return '';
 const now=new Date(); let age=now.getFullYear()-d.getFullYear(); const before=(now.getMonth()<d.getMonth())||(now.getMonth()===d.getMonth()&&now.getDate()<d.getDate()); if(before)age--; return age>=0?String(age):'';
}
function setOutput(r){
 const name = r.name || '';
 const father = r.father || '';
 const mother = r.mother || '';
 const dob = r.dob || '';
 const enName = r.enName || '';
 const enFather = r.enFather || '';
 const enMother = r.enMother || '';
 const enGender = r.enGender || '';

 document.getElementById('manual-name').value = name;
 document.getElementById('manual-father').value = father;
 document.getElementById('manual-mother').value = mother;
 document.getElementById('manual-dob').value = dob;
 document.getElementById('manual-age').value = calculateAge(dob);
 document.getElementById('manual-en-name').value = enName;
 document.getElementById('manual-en-father').value = enFather;
 document.getElementById('manual-en-mother').value = enMother;

 document.getElementById('out-name').textContent = name || '---';
 document.getElementById('out-father').textContent = father || '---';
 document.getElementById('out-mother').textContent = mother || '---';

 // PDF must always show Bengali numerals.
 document.getElementById('out-dob').textContent =
   dob ? BANGLA_DATE(dob) : '---';
 document.getElementById('out-en-name').textContent = enName || '---';
 document.getElementById('out-en-father').textContent = enFather || '---';
 document.getElementById('out-en-mother').textContent = enMother || '---';
 document.getElementById('out-en-gender').textContent = enGender || '---';
 // The English certificate's Born on and Date of Issue always use the
 // extracted child DOB, exactly as requested.
 document.getElementById('out-en-dob').textContent = dob || '---';
 document.getElementById('out-en-issue').textContent = dob || '---';

 const issue = document.getElementById('issue-date');
 if(issue){
   issue.textContent = enToBnNumeral(new Date().toLocaleDateString('en-GB'));
 }
}



function extractAgeByRole(lines, type){
  const start = roleStartIndex(lines);
  let role = '';
  const target = type === 'father' ? 'father' : 'mother';

  for(let i=start; i<lines.length; i++){
    const line = lines[i];

    if(/(?:পিতার|পিতা|বাবার|বাবা|father)/iu.test(line)) role='father';
    else if(/(?:মাতার|মাতা|মায়ের|মা|mother)/iu.test(line)) role='mother';

    if(role !== target) continue;

    const m = norm(line).match(
      /(?:বয়স|বয়স|age)\s*[ঃ:：=\-]?\s*(\d{1,3})/iu
    );
    if(m) return bnToEn(m[1]);

    if(/(?:বয়স|বয়স|age)\s*[ঃ:：=\-]?\s*$/iu.test(line)){
      for(let j=i+1; j<Math.min(lines.length,i+3); j++){
        const n = norm(lines[j]).match(/^\d{1,3}$/);
        if(n) return n[0];
      }
    }
  }
  return '';
}

function extractChildGender(text){
  const s = norm(text).toLowerCase();

  // Female is checked first so "female" cannot be confused with "male".
  if(/(?:\bfemale\b|নারী|মহিলা|মেয়ে|মেয়ে)/iu.test(s)) return 'Female';
  if(/(?:\bmale\b|পুরুষ|ছেলে)/iu.test(s)) return 'Male';

  return '';
}

/* =========================================================
   Exhaustive multi-format parser upgrade
   Handles the formats collected in file (1)(3).txt:
   labelled, emoji-labelled, sectioned, label-less pairs,
   compact one-line records, nested Bangla/English labels,
   first/last-name formats, and mixed address blocks.
   ========================================================= */
function _cleanLine(v){
  return norm(String(v||'')).replace(/^[\s\u200B-\u200D\uFEFF]+|[\s]+$/g,'').trim();
}
function _stripDecor(v){
  return _cleanLine(v).replace(/^[★*•▪️🗣️💠👉🔰📋👨👦👩👧🏡♦️¥¬\-–—]+\s*/u,'').trim();
}
function _fieldValue(line){
  let s=_stripDecor(line);
  s=s.replace(/^(?:বাংলায়|বাংলায়|বাংলা|ইংরেজী|ইংরেজি|ইংরেজিতে|ইংরেজিতেঃ)\s*[:：=ঃ\-–—]?\s*/iu,'');
  s=s.replace(/^[:：=ঃ\-–—]+\s*/,'');
  return s.trim();
}
function _looksEnglishValue(v){
  const s=_cleanLine(v).replace(/[.,'’`]/g,'').trim();
  if(!s || /[\u0980-\u09FF]/.test(s) || /\d/.test(s)) return false;
  if(s.length>90) return false;
  return /^[A-Za-z][A-Za-z .&'’\-]*$/.test(s) && /[A-Za-z]{2,}/.test(s);
}
function _isFieldLine(line){
  return /(?:^|\s)(?:name|date|birth|gender|sex|father|mother|address|village|post|union|upazila|district|division|ward|nid|brn|dob|nationality|mobile|phone|place|child|sontan|সন্তান|জন্ম|তারিখ|লিঙ্গ|নারী|পুরুষ|মহিলা|মেয়ে|ছেলে|পিতা|পিতার|মাতা|মাতার|বাবা|মা|ঠিকানা|গ্রাম|ডাকঘর|উপজেলা|জেলা|বিভাগ|ইউনিয়ন|ওয়ার্ড|জাতীয়তা|আইডি|নিবন্ধন|মোবাইল|জন্মস্থান)/iu.test(_stripDecor(line));
}
function _genderFromText(text){
  const s=_cleanLine(text).toLowerCase();
  if(/female|felame|femal|femele|fe\s*male|নারী|নারি|মহিলা|মেয়ে|মেয়ে/.test(s)) return 'Female';
  if(/male|mle|mal|পুরুষ|ছেলে/.test(s)) return 'Male';
  return '';
}
function _dateFromText(text){
  const s=bnToEn(String(text||'')).replace(/,/g,' ');
  const parsed=parseDateString(s);
  if(parsed) return parsed;
  const m=s.match(/\b(\d{1,2})\s*(?:st|nd|rd|th)?\s*(?:day\s*)?(?:of\s*)?([A-Za-z]+)\s*,?\s*(\d{4})\b/i);
  if(m){const month=enMonths[m[2].toLowerCase()];if(month)return `${String(+m[1]).padStart(2,'0')}/${String(month).padStart(2,'0')}/${m[3]}`;}
  const ymd=s.match(/\b(\d{4})\s*[\/-]\s*(\d{1,2})\s*[\/-]\s*(\d{1,2})\b/);
  if(ymd)return `${String(+ymd[3]).padStart(2,'0')}/${String(+ymd[2]).padStart(2,'0')}/${ymd[1]}`;
  return '';
}
function _extractEnglishLabelValue(line){
  const l=_stripDecor(line);
  const patterns=[
    /^(?:name|name\s*english|english\s*name|name\s*in\s*english)\s*[:：=ঃ\-–—]\s*(.+)$/i,
    /^name\s*\(\s*(?:english|ইংরেজি|ইংরেজী)\s*\)\s*[:：=ঃ\-–—]\s*(.+)$/iu,
    /^নাম\s*\(\s*(?:ইংরেজি|ইংরেজী|english)\s*\)\s*[:：=ঃ\-–—]\s*(.+)$/iu,
    /^নাম\s*[:：]\s*(?:ইংরেজি|ইংরেজী|ইংরেজিতে|ইংরেজিতেঃ)\s*[:：=ঃ\-–—]?\s*(.+)$/iu,
    /^(?:নাম\s*(?:ইংরেজি|ইংরেজী|ইংরেজিতে|ইংরেজিতেঃ)|ইংরেজী|ইংরেজি)\s*[ঃ:：=\-–—]\s*(.+)$/iu
  ];
  for(const re of patterns){const m=l.match(re);if(m&&(_looksEnglishValue(m[1])||/^(?:MD|MST|MOST|MR|MRS)\s*[:.]/i.test(_stripDecor(m[1]))))return _cleanEnglishNameValue(m[1]);}
  return '';
}
function _extractBanglaNameLabel(line){
  let l=_stripDecor(line);
  if(/^নামের\s*(?:প্রথম|শেষ)\s*অংশ/iu.test(l)) return '';
  const patterns=[
    /^(?:নাম\s*\(\s*বাংল(?:ায়|ায়|া)\s*\)|নাম\s*বাংল(?:ায়|ায়|া)|নাম\s*বাংলা)\s*[:：=ঃ\-–—]\s*(.+)$/iu,
    /^নাম\s*[:：]\s*বাংল(?:ায়|ায়|া)\s*[:：=ঃ\-–—]\s*(.+)$/iu,
    /^(?:নাম)\s*[:：=ঃ\-–—]\s*(.+)$/iu
  ];
  for(const re of patterns){const m=l.match(re);if(m&&/[\u0980-\u09FF]/.test(m[1]))return cleanBanglaName(m[1]);}
  return '';
}
function _looksEnglishValue(v){
  const s=_cleanLine(v).replace(/[.,'’`]/g,'').trim();
  if(!s || /[\u0980-\u09FF]/.test(s) || /\d/.test(s) || s.length>90)return false;
  return /^[A-Za-z][A-Za-z .&'’\-]*$/.test(s) && /[A-Za-z]{2,}/.test(s);
}

function _cleanEnglishNameValue(v){
  let s=_stripDecor(v);
  s=s.replace(/^(?:MD|MST|MOST|MR|MRS)\s*[:.]\s*/i,m=>m.replace(/[:.]/g,' ') );
  s=s.replace(/\s+/g,' ').trim();
  return s;
}
function _extractAddressFields(text){
  const fields={village:'',post:'',ward:'',union:'',upazila:'',district:'',division:'',mobile:''};
  const patterns={
    village:/^(?:গ্রাম|village)(?:\s*\(\s*(?:বাংলা|ইংরেজি|english)\s*\))?\s*[:：=ঃ\-–—]\s*(.+)$/iu,
    post:/^(?:ডাকঘর(?:\s*কোড\s*সহ)?|post\s*office(?:\s*with\s*code)?)(?:\s*\(\s*(?:বাংলা|ইংরেজি|english)\s*\))?\s*[:：=ঃ\-–—]\s*(.+)$/iu,
    ward:/^(?:ওয়ার্ড|ওয়ার্ড|ward)(?:\s*নং)?\s*[:：=ঃ\-–—]\s*(.+)$/iu,
    union:/^(?:ইউনিয়ন|ইউনিয়ন|union)\s*[:：=ঃ\-–—]\s*(.+)$/iu,
    upazila:/^(?:উপজেলা|upazila)\s*[:：=ঃ\-–—]\s*(.+)$/iu,
    district:/^(?:জেলা|district)\s*[:：=ঃ\-–—]\s*(.+)$/iu,
    division:/^(?:বিভাগ|division)\s*[:：=ঃ\-–—]\s*(.+)$/iu,
    mobile:/^(?:মোবাইল|mobile|phone)\s*[:：=ঃ\-–—]\s*(.+)$/iu
  };
  for(const line of linesOf(text)){
    const clean=_stripDecor(line);
    for(const key of Object.keys(fields)){
      const match=clean.match(patterns[key]);
      if(match&&!fields[key]) fields[key]=_cleanLine(match[1]);
    }
  }
  return fields;
}
function _extractGenericParentPair(text, role){
  const lines=linesOf(text);
  const startRe=role==='father'?/পিতার\s*তথ্য/iu:/মাতার\s*তথ্য/iu;
  const endRe=role==='father'?/মাতার\s*তথ্য/iu:/পিতার\s*তথ্য/iu;
  const start=lines.findIndex(line=>startRe.test(line));
  if(start<0)return {bn:'',en:''};
  let bn='',en='';
  for(let i=start+1;i<lines.length;i++){
    const line=_stripDecor(lines[i]);
    if(endRe.test(line))break;
    const bnMatch=line.match(/^নাম\s*(?:\(\s*বাংলা\s*\))?\s*[:：=ঃ\-–—]\s*(.+)$/iu);
    const enMatch=line.match(/^(?:name|নাম\s*\(\s*(?:ইংরেজি|ইংরেজী)\s*\))\s*[:：=ঃ\-–—]\s*(.+)$/iu);
    if(bnMatch&&/[ - ]/.test(bnMatch[1]))bn=cleanBanglaName(bnMatch[1]);
    if(enMatch&&_looksEnglishValue(enMatch[1]))en=_cleanEnglishNameValue(enMatch[1]);
    if(bnMatch&&/[\u0980-\u09FF]/.test(bnMatch[1]))bn=cleanBanglaName(bnMatch[1]);
    if(bn&&en)break;
  }
  return {bn,en};
}
function _findRole(lines, role, start=0, end=lines.length){
  const isF=role==='father';
  const sectionRe=isF?/^.*(?:پدر(?:\s*র|\s*এর)?\s*তথ্য|পিতার\s*তথ্য|পিতার\s*নাম|পিতা\s*নাম|পিতা)\s*/iu:/(?:মাতার\s*তথ্য|মাতার\s*নাম|মাতা\s*নাম|মাতা)\s*$/iu;
  const oppositeRe=isF?/(?:মাতার\s*তথ্য|মাতার\s*নাম|মাতা\s*নাম)/iu:/(?:পিতার\s*তথ্য|পিতার\s*নাম|পিতা\s*নাম)/iu;
  const bnDirect=isF?/^(?:পিতার\s*নাম|পিতা\s*নাম|পিতা|বাবার\s*নাম|বাবা\s*নাম|বাবা)\s*[:：=ঃ\-–—]\s*(.*)$/iu:/^(?:মাতার\s*নাম|মাতা\s*নাম|মাতা|মায়ের\s*নাম|মায়ের\s*নাম|মা\s*নাম|মা)\s*[:：=ঃ\-–—]\s*(.*)$/iu;
  const enDirect=isF?/^(?:father(?:'s)?\s*name|father|fathers\s*name)\s*[:：=ঃ\-–—]\s*(.*)$/i:/^(?:mother(?:'s)?\s*name|mother|mothers\s*name)\s*[:：=ঃ\-–—]\s*(.*)$/i;
  let bn='',en='';
  const lo=Math.max(0,start),hi=Math.min(end,lines.length);
  const cleanBn=(v)=>{let x=_stripDecor(v);x=x.split(/\s+(?:father|mother|name\s*english|name\s*[:：])/i)[0];return cleanBanglaName(x);};
  // 1. Explicit role lines are authoritative.
  for(let i=lo;i<hi;i++){
    const l=_stripDecor(lines[i]);
    let m=l.match(enDirect);
    if(m&&_looksEnglishValue(m[1])) return {bn:'',en:_cleanEnglishNameValue(m[1])};
    m=l.match(bnDirect);
    if(m&&/[\u0980-\u09FF]/.test(m[1])){
      bn=cleanBn(m[1]);
      // Look ahead only for this parent's English value.
      for(let j=i+1;j<Math.min(hi,i+8);j++){
        const q=_stripDecor(lines[j]);
        if(oppositeRe.test(q)) break;
        const e=q.match(enDirect);
        if(e&&_looksEnglishValue(e[1])) return {bn,en:_cleanEnglishNameValue(e[1])};
        const e2=q.match(enDirect);
        if(e2&&_looksEnglishValue(e2[1])) return {bn,en:_cleanEnglishNameValue(e2[1])};
        if(_looksEnglishValue(q) && !/^(?:male|female|bangladeshi)$/i.test(q)) return {bn,en:_cleanEnglishNameValue(q)};
      }
      return {bn,en:''};
    }
  }
  // 2. Sectioned parent information.
  for(let i=lo;i<hi;i++){
    const l=_stripDecor(lines[i]);
    if(!sectionRe.test(l)) continue;
    let sbn='',sen='';
    for(let j=i+1;j<Math.min(hi,i+18);j++){
      const q=_stripDecor(lines[j]);
      if(j>i+1 && oppositeRe.test(q)) break;
      const b=_extractBanglaNameLabel(q); if(b) sbn=b;
      const e=_extractEnglishLabelValue(q); if(e) sen=_cleanEnglishNameValue(e);
      // Nested format: নাম: বাংলায়: X / নাম: ইংরেজি: Y
      if(!sbn){const mb=q.match(/^নাম\s*[:：]\s*বাংল(?:ায়|ায়|া)\s*[:：=ঃ\-–—]?\s*(.*)$/iu);if(mb&&/[\u0980-\u09FF]/.test(mb[1]))sbn=cleanBanglaName(mb[1]);}
      if(!sen){const me=q.match(/^নাম\s*[:：]\s*(?:ইংরেজি|ইংরেজী|ইংরেজিতে|ইংরেজিতেঃ)\s*[:：=ঃ\-–—]?\s*(.*)$/iu);if(me&&_looksEnglishValue(me[1]))sen=_cleanEnglishNameValue(me[1]);}
      if(sbn&&sen) return {bn:sbn,en:sen};
    }
    if(sbn||sen) return {bn:sbn,en:sen};
  }
  // 3. Label-less pair format only, after child DOB.
  let dob=-1;for(let i=lo;i<hi;i++){if(_dateFromText(lines[i])){dob=i;break;}}
  const pairStart=dob>=0?dob+1:lo;
  const pairs=[];
  for(let i=pairStart;i<hi-1;i++){
    if(!isBanglaName(lines[i])) continue;
    for(let j=i+1;j<=Math.min(hi-1,i+3);j++){
      if(_looksEnglishValue(lines[j])){pairs.push({bn:cleanBanglaName(lines[i]),en:_cleanEnglishNameValue(lines[j])});i=j;break;}
    }
    if(pairs.length>=2) break;
  }
  if(pairs.length) return pairs[isF?0:1]||{};
  return {bn:'',en:''};
}

function _childRecordStrong(text){
  const lines=linesOf(text);
  let dobIndex=-1,dob='';
  for(let i=0;i<lines.length;i++){const d=_dateFromText(lines[i]);if(d){dobIndex=i;dob=d;break;}}
  const childEnd=dobIndex>=0?dobIndex:Math.min(lines.length,15);
  let name='',enName='',gender='';

  // Explicit child name labels.
  for(let i=0;i<childEnd;i++){
    const l=_stripDecor(lines[i]);
    const b=_extractBanglaNameLabel(l); if(b&&!name) name=b;
    const e=_extractEnglishLabelValue(l); if(e&&!enName) enName=_cleanEnglishNameValue(e);
    const g=_genderFromText(l); if(g&&!gender) gender=g;
  }
  // Nested child label with Bengali sub-label.
  if(!name){
    for(let i=0;i<childEnd;i++){
      const m=_stripDecor(lines[i]).match(/^নাম\s*[:：]\s*বাংল(?:ায়|ায়|া)\s*[:：=ঃ\-–—]?\s*(.*)$/iu);
      if(m){name=cleanBanglaName(m[1]);break;}
    }
  }
  // First/last-name format.
  if(!name){
    let first='',last='',efirst='',elast='';
    for(let i=0;i<childEnd;i++){
      let l=_stripDecor(lines[i]),m;
      m=l.match(/^নামের\s*প্রথম\s*অংশ\s*\(বাংলায়\)\s*[:：]\s*(.*)$/iu);if(m)first=cleanBanglaName(m[1]);
      m=l.match(/^নামের\s*শেষ\s*অংশ\s*\(বাংলায়\)\s*[:：]\s*(.*)$/iu);if(m)last=cleanBanglaName(m[1]);
      m=l.match(/^নামের\s*প্রথম\s*অংশ\s*\(ইংরেজি\)\s*[:：]\s*(.*)$/iu);if(m)efirst=_cleanEnglishNameValue(m[1]);
      m=l.match(/^নামের\s*শেষ\s*অংশ\s*\(ইংরেজি\)\s*[:：]\s*(.*)$/iu);if(m)elast=_cleanEnglishNameValue(m[1]);
    }
    if(first||last)name=[first,last].filter(Boolean).join(' ');
    if(efirst||elast)enName=[efirst,elast].filter(Boolean).join(' ');
  }
  // Label-free child pair.
  if(!name){
    for(let i=0;i<childEnd;i++){
      if(isBanglaName(lines[i])){
        name=cleanBanglaName(lines[i]);
        if(!enName&&i+1<childEnd&&_looksEnglishValue(lines[i+1]))enName=_cleanEnglishNameValue(lines[i+1]);
        break;
      }
    }
  }
  if(!enName){for(let i=0;i<childEnd;i++){if(_looksEnglishValue(lines[i])&&!/^(?:male|female|bangladeshi|dhaka|cumilla|chattogram|sylhet|khulna|rajshahi|barishal|rangpur|mymensingh)$/i.test(_stripDecor(lines[i]))){enName=_cleanEnglishNameValue(lines[i]);break;}}}
  const genderEnd=Math.min(lines.length,(dobIndex>=0?dobIndex+7:childEnd));
  for(let i=0;i<genderEnd;i++){const g=_genderFromText(lines[i]);if(g){gender=g;break;}}

  const roleStart=dobIndex>=0?dobIndex+1:0;
  let f=_findRole(lines,'father',roleStart,lines.length);
  let m=_findRole(lines,'mother',roleStart,lines.length);
  if(!(f.bn||f.en)) f=_findRole(lines,'father',0,lines.length);
  if(!(m.bn||m.en)) m=_findRole(lines,'mother',0,lines.length);
  const father=f.bn||'',mother=m.bn||'',enFather=f.en||'',enMother=m.en||'';

  // Compact one-line parent fields.
  const joined=lines.join(' ');
  const fm=joined.match(/(?:পিতার\s*নাম|পিতা|বাবা)\s*[:=：\-]\s*([^,;]+?)(?=\s+(?:মাতার\s*নাম|মাতা|মা)\s*[:=：\-]|\s+Father|$)/iu);
  const mom=joined.match(/(?:মাতার\s*নাম|মাতা|মা)\s*[:=：\-]\s*([^,;]+?)(?=\s+(?:জন্মস্থান|ঠিকানা|গ্রাম|Mother|$))/iu);
  let fb=father||((fm&&/[\u0980-\u09FF]/.test(fm[1]))?cleanBanglaName(fm[1]):'');
  let mb=mother||((mom&&/[\u0980-\u09FF]/.test(mom[1]))?cleanBanglaName(mom[1]):'');
  let fe=enFather,me=enMother;
  if(!fe){const x=joined.match(/Father(?:'s)?\s*(?:Name)?\s*[:=：\-]\s*(?:MD|MST|MOST)?\.?\s*[A-Za-z][A-Za-z .&'’\-]*/i);if(x)fe=_cleanEnglishNameValue(x[0].replace(/^.*?[:=：\-]\s*/,'').trim());}
  if(!me){const x=joined.match(/Mother(?:'s)?\s*(?:Name)?\s*[:=：\-]\s*(?:MD|MST|MOST)?\.?\s*[A-Za-z][A-Za-z .&'’\-]*/i);if(x)me=_cleanEnglishNameValue(x[0].replace(/^.*?[:=：\-]\s*/,'').trim());}
  return {name:name||'',enName:enName||'',father:fb,mother:mb,enFather:fe||'',enMother:me||'',dob,enGender:gender,score:(name?50:0)+(enName?20:0)+(fb?20:0)+(mb?20:0)+(fe?10:0)+(me?10:0)+(dob?25:0)+(gender?10:0)};
}

// Last declaration wins over the earlier parser versions.
function _explicitParentFromText(text, role){
  const isF=role==='father';
  const lines=linesOf(text);
  let bn='',en='';
  const sectionStart=isF?/(?:পিতার\s*তথ্য|পিতার\s*নাম|পিতা\s*নাম|পিতা\s*:|পিতা-)/iu:/(?:মাতার\s*তথ্য|মাতার\s*নাম|মাতা\s*নাম|মাতা\s*:|মাতা-)/iu;
  const sectionEnd=isF?/(?:মাতার\s*তথ্য|মাতার\s*নাম|মাতা\s*নাম|মাতা\s*:|মাতা-)/iu:/(?:পিতার\s*তথ্য|পিতার\s*নাম|পিতা\s*নাম|পিতা\s*:|পিতা-)/iu;
  // First pass: explicit English/Bangla parent labels.
  for(let i=0;i<lines.length;i++){
    const l=_stripDecor(lines[i]);
    let m=l.match(isF?/^(?:পিতার\s*নাম(?:\s*(?:বাংলায়|বাংলায়|বাংলা|ইংরেজি|ইংরেজীতে|ইংরেজিতেঃ))?|পিতা\s*নাম|পিতা|বাবার\s*নাম|বাবা\s*নাম|বাবা)\s*[:：=ঃ\-–—]\s*(.*)$/iu:/^(?:মাতার\s*নাম(?:\s*(?:বাংলায়|বাংলায়|বাংলা|ইংরেজি|ইংরেজীতে|ইংরেজিতেঃ))?|মাতা\s*নাম|মাতা|মায়ের\s*নাম|মায়ের\s*নাম|মা\s*নাম|মা)\s*[:：=ঃ\-–—]\s*(.*)$/iu);
    if(m&&/[\u0980-\u09FF]/.test(m[1])){bn=cleanBanglaName(m[1].split(/\s+(?:father|mother|name\s*english|name\s*[:：])/i)[0]);}
    m=l.match(isF?/^(?:father(?:'s)?\s*name|father|fathers\s*name)\s*[:：=ঃ\-–—]\s*(.*)$/i:/^(?:mother(?:'s)?\s*name|mother|mothers\s*name)\s*[:：=ঃ\-–—]\s*(.*)$/i);
    if(m&&(_looksEnglishValue(m[1])||/^(?:MD|MST|MOST)\s*[:.]/i.test(m[1]))) en=_cleanEnglishNameValue(m[1]);
    m=l.match(isF?/^পিতার\s*নাম\s*(?:ইংরেজি|ইংরেজী|ইংরেজিতে|ইংরেজিতেঃ)\s*[:：=ঃ\-–—]\s*(.*)$/iu:/^মাতার\s*নাম\s*(?:ইংরেজি|ইংরেজী|ইংরেজিতে|ইংরেজিতেঃ)\s*[:：=ঃ\-–—]\s*(.*)$/iu);
    if(m&&(_looksEnglishValue(m[1])||/^(?:MD|MST|MOST)\s*[:.]/i.test(m[1]))) en=_cleanEnglishNameValue(m[1]);
  }
  // Second pass: sectioned formats with nested name labels.
  for(let i=0;i<lines.length;i++){
    const l=_stripDecor(lines[i]);
    if(!sectionStart.test(l)) continue;
    let sb='',se='';
    for(let j=i+1;j<Math.min(lines.length,i+25);j++){
      const q=_stripDecor(lines[j]);
      if(j>i+1&&sectionEnd.test(q))break;
      let mb=q.match(/^নাম\s*[:：]\s*বাংল(?:ায়|ায়|া)\s*[:：=ঃ\-–—]?\s*(.*)$/iu);
      if(mb&&/[\u0980-\u09FF]/.test(mb[1]))sb=cleanBanglaName(mb[1]);
      mb=q.match(/^(?:নাম\s*(?:বাংলায়|বাংলায়|বাংলা)|নাম\s*\(বাংলায়\))\s*[:：=ঃ\-–—]\s*(.*)$/iu);
      if(mb&&/[\u0980-\u09FF]/.test(mb[1]))sb=cleanBanglaName(mb[1]);
      let me=q.match(/^নাম\s*[:：]\s*(?:ইংরেজি|ইংরেজী|ইংরেজিতে|ইংরেজিতেঃ)\s*[:：=ঃ\-–—]?\s*(.*)$/iu);
      if(me&&(_looksEnglishValue(me[1])||/^(?:MD|MST|MOST)\s*[:.]/i.test(me[1])))se=_cleanEnglishNameValue(me[1]);
      me=q.match(/^(?:নাম\s*(?:ইংরেজি|ইংরেজী|ইংরেজিতে|ইংরেজিতেঃ))\s*[:：=ঃ\-–—]\s*(.*)$/iu);
      if(me&&(_looksEnglishValue(me[1])||/^(?:MD|MST|MOST)\s*[:.]/i.test(me[1])))se=_cleanEnglishNameValue(me[1]);
      if(sb&&se)return{bn:sb,en:se};
    }
    if(sb||se)return{bn:sb,en:se};
  }
  return {bn,en};
}
function _explicitChildFromText(text){
  const lines=linesOf(text);
  let name='',enName='';
  let first='',last='',efirst='',elast='';
  for(const raw of lines){
    const l=_stripDecor(raw);
    let m=l.match(/^নামের\s*প্রথম\s*অংশ\s*\(বাংল(?:ায়|ায়|া)\)\s*[:：]\s*(.*)$/iu);if(m)first=cleanBanglaName(m[1]);
    m=l.match(/^নামের\s*শেষ\s*অংশ\s*\(বাংল(?:ায়|ায়|া)\)\s*[:：]\s*(.*)$/iu);if(m)last=cleanBanglaName(m[1]);
    m=l.match(/^নামের\s*প্রথম\s*অংশ\s*\(ইংরেজি\)\s*[:：]\s*(.*)$/iu);if(m)efirst=_cleanEnglishNameValue(m[1]);
    m=l.match(/^নামের\s*শেষ\s*অংশ\s*\(ইংরেজি\)\s*[:：]\s*(.*)$/iu);if(m)elast=_cleanEnglishNameValue(m[1]);
    const b=_extractBanglaNameLabel(l);if(b&&!name)name=b;
    const e=_extractEnglishLabelValue(l);if(e&&!enName)enName=_cleanEnglishNameValue(e);
  }
  if(first||last)name=[first,last].filter(Boolean).join(' ');
  if(efirst||elast)enName=[efirst,elast].filter(Boolean).join(' ');
  // Generic Name: English can be confused with parent Name lines, so only use it
  // before the first parent marker.
  if(!enName){
    const parentAt=lines.findIndex(x=>/(?:পিতার|পিতা|মাতার|মাতা|father|mother)\b/iu.test(_stripDecor(x)));
    const limit=parentAt>=0?parentAt:lines.length;
    for(let i=0;i<limit;i++){const e=_extractEnglishLabelValue(lines[i]);if(e){enName=_cleanEnglishNameValue(e);break;}}
  }
  return {name:name||'',enName:enName||''};
}
function _labelFreeParentPairs(text){
  const lines=linesOf(text), pairs=[];
  let dob=-1;for(let i=0;i<lines.length;i++){if(_dateFromText(lines[i])){dob=i;break;}}
  const start=dob>=0?dob+1:0;
  for(let i=start;i<lines.length-1;i++){
    if(!isBanglaName(lines[i]))continue;
    for(let j=i+1;j<=Math.min(lines.length-1,i+3);j++){
      if(_looksEnglishValue(lines[j])){pairs.push({bn:cleanBanglaName(lines[i]),en:_cleanEnglishNameValue(lines[j])});i=j;break;}
    }
    if(pairs.length>=2)break;
  }
  return pairs;
}
function chooseRecord(text){
  const child=_explicitChildFromText(text);
  const lines=linesOf(text);
  const address=_extractAddressFields(text);
  let dob='';for(const l of lines){const d=_dateFromText(l);if(d){dob=d;break;}}
  // Label-free child pair fallback.
  if(!child.name||!child.enName){
    const dobIndex=lines.findIndex(l=>_dateFromText(l));
    const limit=dobIndex>=0?dobIndex:Math.min(lines.length,12);
    for(let i=0;i<limit;i++){
      if(!child.name&&isBanglaName(lines[i]))child.name=cleanBanglaName(lines[i]);
      if(child.name&&!child.enName&&i+1<limit&&_looksEnglishValue(lines[i+1]))child.enName=_cleanEnglishNameValue(lines[i+1]);
    }
  }
  const f0=_explicitParentFromText(text,'father'),m0=_explicitParentFromText(text,'mother');
  const fg=_extractGenericParentPair(text,'father'),mg=_extractGenericParentPair(text,'mother');
  let father=f0.bn||fg.bn,mother=m0.bn||mg.bn,enFather=f0.en||fg.en,enMother=m0.en||mg.en;
  // Label-free parent pair fallback only when explicit fields are missing.
  const pairs=_labelFreeParentPairs(text);
  if(!father&&pairs[0])father=pairs[0].bn;
  if(!enFather&&pairs[0])enFather=pairs[0].en;
  if(!mother&&pairs[1])mother=pairs[1].bn;
  if(!enMother&&pairs[1])enMother=pairs[1].en;
  const gender=_genderFromText(lines.slice(0,Math.min(lines.length,Math.max(10,(lines.findIndex(l=>_dateFromText(l))+8)))).join(' '));
  return {name:child.name||'',enName:child.enName||'',father:father||'',enFather:enFather||'',mother:mother||'',enMother:enMother||'',dob,enGender:gender||'',...address,score:(child.name?50:0)+(child.enName?20:0)+(father?20:0)+(mother?20:0)+(enFather?10:0)+(enMother?10:0)+(dob?25:0)+(gender?10:0)};
}
function extractEnglishRecord(lines){
  const r=chooseRecord(lines.join('\n'));
  return {enName:r.enName||'',enFather:r.enFather||'',enMother:r.enMother||'',enGender:r.enGender||''};
}

function parseJsonRegistration(raw){
  const text=String(raw||'').trim();
  if(!text || (text[0]!=='{' && text[0]!=='[')) return null;
  let data;
  try { data=JSON.parse(text); } catch(e) { return null; }
  if(Array.isArray(data)) data=data[0]||{};
  if(!data || typeof data!=='object') return null;

  const p=data.person||data.child||{};
  const f=data.father||{};
  const m=data.mother||{};

  const joinName=(a,b)=>[a,b].map(v=>String(v||'').trim()).filter(Boolean).join(' ');
  const bnGender=String(p.gender||'').trim();
  let gender='';
  if(/^(?:মেয়ে|মেয়ে|নারী|মহিলা|female|f)$/iu.test(bnGender)) gender='Female';
  else if(/^(?:ছেলে|পুরুষ|male|m)$/iu.test(bnGender)) gender='Male';

  return {
    name:joinName(p.firstNameBn,p.lastNameBn),
    enName:joinName(p.firstNameEn,p.lastNameEn),
    father:String(f.nameBn||'').trim(),
    enFather:String(f.nameEn||'').trim(),
    mother:String(m.nameBn||'').trim(),
    enMother:String(m.nameEn||'').trim(),
    dob:parseDateString(String(p.birthDate||''))||String(p.birthDate||'').trim(),
    enGender:gender,
    childOrder:String(p.childOrder||'').trim(),
    fatherAge:String(f.birthDate||'').trim(),
    motherAge:String(m.birthDate||'').trim(),
    score:250,
    sourceJson:data
  };
}

function extractExplicitParentFields(text){
  const source=String(text||'');
  const value=(pattern,clean)=>{
    const match=source.match(pattern);
    if(!match) return '';
    const result=String(match[1]||'').replace(/[“”"'`]+$/g,'').trim();
    return clean ? clean(result) : result;
  };

  return {
    father:value(/(?:পিতার\s*নাম|পিতা\s*নাম|বাবার\s*নাম)\s*(?:\((?:বাংলা(?:য়|য়)?|bn)\))?\s*[ঃ:：=]\s*([^\r\n]+)/iu, cleanBanglaName),
    mother:value(/(?:মাতার\s*নাম|মাতা\s*নাম|মায়ের\s*নাম|মায়ের\s*নাম)\s*(?:\((?:বাংলা(?:য়|য়)?|bn)\))?\s*[ঃ:：=]\s*([^\r\n]+)/iu, cleanBanglaName),
    enFather:value(/father(?:'?s)?\s*name\s*(?:\((?:english|en)\))?\s*[ঃ:：=]\s*([^\r\n]+)/iu),
    enMother:value(/mother(?:'?s)?\s*name\s*(?:\((?:english|en)\))?\s*[ঃ:：=]\s*([^\r\n]+)/iu)
  };
}

function parseAndGenerate(){
  const rawBn = document.getElementById('raw-data-bn').value;
  const enBox = document.getElementById('raw-data-en');
  const rawEn = enBox ? enBox.value : '';

  if(!rawBn.trim() && !rawEn.trim()){
    document.getElementById('status').textContent =
      'আগে বাংলা অথবা English তথ্য paste করুন।';
    return;
  }

  // JSON input support. A complete registration object can be pasted into
  // either text box. JSON is parsed directly instead of going through the
  // free-form text heuristics.
  const jsonRecord = parseJsonRegistration(rawBn.trim() || rawEn.trim());
  if(jsonRecord){
    setOutput(jsonRecord);
    const found = [
      jsonRecord.name && 'নাম',
      jsonRecord.enName && 'English নাম',
      jsonRecord.father && 'পিতা',
      jsonRecord.mother && 'মাতা',
      jsonRecord.dob && 'জন্ম তারিখ',
      jsonRecord.enGender && 'Gender'
    ].filter(Boolean);
    document.getElementById('status').textContent =
      `JSON Detected: ${found.join(' + ') || 'কিছু পাওয়া যায়নি'} | ` +
      'JSON data সরাসরি form-এ বসানো হয়েছে।';
    return;
  }

  // Bengali block is preferred for Bengali fields.
  const baseText = rawBn.trim() || rawEn;
  const bnRecord = chooseRecord(baseText);
  const explicitParents = extractExplicitParentFields(rawBn + '\n' + rawEn);

  // English block can provide English names and gender.
  const englishSource = rawEn.trim() || rawBn;
  const englishRecord = extractEnglishRecord(linesOf(englishSource));

  // Gender is intentionally taken from either language and converted to English.
  const gender = extractChildGender(rawBn + '\n' + rawEn);

  const linesForAge = linesOf(baseText);
  const fatherAge = extractAgeByRole(linesForAge, 'father');
  const motherAge = extractAgeByRole(linesForAge, 'mother');

  const r = {
    ...bnRecord,
    ...englishRecord,
    father: explicitParents.father || bnRecord.father || '',
    mother: explicitParents.mother || bnRecord.mother || '',
    enFather: explicitParents.enFather || englishRecord.enFather || '',
    enMother: explicitParents.enMother || englishRecord.enMother || '',
    enGender: gender || englishRecord.enGender || '',
    fatherAge,
    motherAge
  };

  setOutput(r);

  const found = [
    r.name && 'নাম',
    r.enName && 'English নাম',
    r.father && 'পিতা',
    r.mother && 'মাতা',
    r.dob && 'জন্ম তারিখ',
    r.enGender && 'Gender'
  ].filter(Boolean);

  document.getElementById('status').textContent =
    `Detected: ${found.join(' + ') || 'কিছু পাওয়া যায়নি'} | ` +
    `Confidence score: ${r.score || 0} | ` +
    `এখন বাংলা PDF অথবা English PDF চাপুন।`;
}

function generateManually(){
  const value = id => document.getElementById(id).value.trim();
  const record = {
    name:value('manual-name'),
    father:value('manual-father'),
    mother:value('manual-mother'),
    village:value('manual-village'),
    post:value('manual-post'),
    ward:value('manual-ward'),
    union:value('manual-union'),
    upazila:value('manual-upazila'),
    district:value('manual-district'),
    division:value('manual-division'),
    mobile:value('manual-mobile'),
    dob:value('manual-dob'),
    enName:value('manual-en-name'),
    enFather:value('manual-en-father'),
    enMother:value('manual-en-mother'),
    enGender:value('manual-gender')
  };

  if(!record.name && !record.father && !record.mother && !record.dob &&
     !record.enName && !record.enFather && !record.enMother){
    document.getElementById('status').textContent =
      'ম্যানুয়ালি Generate করতে অন্তত একটি তথ্য পূরণ করুন।';
    return;
  }

  setOutput(record);
  document.getElementById('status').textContent =
    'ম্যানুয়াল তথ্য দিয়ে Preview তৈরি হয়েছে। এখন বাংলা PDF অথবা English PDF চাপুন।';
}

function setOutput(r){
  const name = r.name || '';
  const father = r.father || '';
  const mother = r.mother || '';
  const dob = r.dob || '';
  const enName = r.enName || '';
  const enFather = r.enFather || '';
  const enMother = r.enMother || '';
  const enGender = r.enGender || '';
  const fatherAge = r.fatherAge || '';
  const motherAge = r.motherAge || '';

  document.getElementById('manual-name').value = name;
  document.getElementById('manual-father').value = father;
  document.getElementById('manual-mother').value = mother;
  document.getElementById('manual-village').value = r.village || '';
  document.getElementById('manual-post').value = r.post || '';
  document.getElementById('manual-ward').value = r.ward || '';
  document.getElementById('manual-union').value = r.union || '';
  document.getElementById('manual-upazila').value = r.upazila || '';
  document.getElementById('manual-district').value = r.district || '';
  document.getElementById('manual-division').value = r.division || '';
  document.getElementById('manual-mobile').value = r.mobile || '';
  document.getElementById('manual-dob').value = dob;
  document.getElementById('manual-age').value = calculateAge(dob);
  document.getElementById('manual-en-name').value = enName;
  document.getElementById('manual-en-father').value = enFather;
  document.getElementById('manual-en-mother').value = enMother;
  document.getElementById('manual-gender').value = enGender;
  document.getElementById('manual-father-age').value = fatherAge;
  document.getElementById('manual-mother-age').value = motherAge;

  document.getElementById('out-name').textContent = name || '---';
  document.getElementById('out-father').textContent = father || '---';
  document.getElementById('out-mother').textContent = mother || '---';

  document.getElementById('out-dob').textContent =
    dob ? BANGLA_DATE(dob) : '---';

  document.getElementById('out-en-name').textContent = enName || '---';
  document.getElementById('out-en-father').textContent = enFather || '---';
  document.getElementById('out-en-mother').textContent = enMother || '---';

  // If gender is missing, the English field stays empty.
  document.getElementById('out-en-gender').textContent = enGender || '';

  document.getElementById('out-en-dob').textContent = dob || '---';
  document.getElementById('out-en-issue').textContent = dob || '---';

  const issue = document.getElementById('issue-date');
  if(issue){
    issue.textContent =
      enToBnNumeral(new Date().toLocaleDateString('en-GB'));
  }
}

function printCertificate(language){
  const dob = document.getElementById('manual-dob').value;

  if(!dob){
    document.getElementById('status').textContent =
      'আগে তথ্য paste করে Extract করুন।';
    return;
  }

  document.body.dataset.printMode = language;
  window.print();
}

window.addEventListener('afterprint', () => {
  delete document.body.dataset.printMode;
});

function clearData(){
  document.getElementById('raw-data-bn').value = '';
  const enBox = document.getElementById('raw-data-en');
  if(enBox) enBox.value = '';

  setOutput({});

  document.getElementById('status').textContent =
    'তথ্য paste করে Generate চাপুন।';
}

document.getElementById('issue-date').textContent = TODAY_BANGLA();

