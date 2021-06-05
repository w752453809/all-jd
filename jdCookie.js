/*
此文件为Node.js专用。其他用户请忽略
 */
//此处填写京东账号cookie。
let CookieJDs = [
  'cid=9; retina=1; webp=1; __jdv=122270672%7Cdirect%7C-%7Cnone%7C-%7C1622722708845; mba_muid=1622722708844929391054; visitkey=70637761004325623; shshshfpa=710bfd90-4d71-673b-8cdb-8288445c3b00-1622722713; shshshfpb=mDRKzcXlgm09iJUK2FAnxmA%3D%3D; 3AB9D23F7A4B3C9B=JENFERR3336BBSD6HW6MVJVOGTP3JCKZLOR2BCIZGUKD3HIPHU7GA24B42BUIIM2RGGQT746HCBPTBR3QH6AVKS7PU; TrackerID=qcQW2UgSi386ycBZBsXbLvSRqsBHsAy43CDSyXOP_rye55AZZY-nwTfylDpmtD3OHWWnONqa-FF6PIHecFbPc37gaxiaMZhodUSep5v1fqputD7FM-FvqRD_jruilLQrRWg-TsXQFhbM-1noh-Bz6w; pt_key=AAJguMiuADD_LueiLPtM3A-8a_h1Q8MFowyCpbiigOVqVPiUOFg6-bdKkmL3kdaIgGRDOQakeq8; pt_pin=jd_618b7c58d777d; pt_token=tdkyxpoz; pwdt_id=jd_618b7c58d777d; sfstoken=tk01me4011d9fa8sM3gyKzMrMkZQ7LLSOeCEtPeAThZklXYbuuhMCoks6pRSieBjowdUxYW3DUtiv+NPiiy0Mh7bAeuO; PPRD_P=UUID.1622722708844929391054; sc_width=375; wxa_level=1; jxsid=16228576472337917981; __jdc=122270672; __jda=122270672.1622722708844929391054.1622722708.1622857647.1622857647.3; shshshfp=4f9ae20d18bc4b38edc0d3e9191df614; __jdb=122270672.2.1622722708844929391054|3.1622857647; mba_sid=16228576475934201743918446183.2; shshshsID=409045544963d7d2d19572c990dd9b55_2_1622857655622; __jd_ref_cls=MCommonHead_Back; wqmnx1=MDEyNjM3NHNlY2Rtb2V1NzE2bCBlaU9fICBsdC5Ua29pMGkxYS45NzZZZi00WUQjKEg%3D; __wga=1622857666242.1622857647384.1622722736151.1622722736151.3.2; jxsid_s_t=1622857666285; jxsid_s_u=https%3A//home.m.jd.com/myJd/newhome.action',//账号一ck,例:pt_key=XXX;pt_pin=XXX;
  '',//账号二ck,例:pt_key=XXX;pt_pin=XXX;如有更多,依次类推
]
// 判断环境变量里面是否有京东ck
if (process.env.JD_COOKIE) {
  if (process.env.JD_COOKIE.indexOf('&') > -1) {
    CookieJDs = process.env.JD_COOKIE.split('&');
  } else if (process.env.JD_COOKIE.indexOf('\n') > -1) {
    CookieJDs = process.env.JD_COOKIE.split('\n');
  } else {
    CookieJDs = [process.env.JD_COOKIE];
  }
}
if (JSON.stringify(process.env).indexOf('GITHUB')>-1) {
  console.log(`请勿使用github action运行此脚本,无论你是从你自己的私库还是其他哪里拉取的源代码，都会导致我被封号\n`);
  !(async () => {
    await require('./sendNotify').sendNotify('提醒', `请勿使用github action、滥用github资源会封我仓库以及账号`)
    await process.exit(0);
  })()
}
CookieJDs = [...new Set(CookieJDs.filter(item => !!item))]
console.log(`\n====================共${CookieJDs.length}个京东账号Cookie=========\n`);
console.log(`==================脚本执行- 北京时间(UTC+8)：${new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000).toLocaleString()}=====================\n`)
if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
for (let i = 0; i < CookieJDs.length; i++) {
  if (!CookieJDs[i].match(/pt_pin=(.+?);/) || !CookieJDs[i].match(/pt_key=(.+?);/)) console.log(`\n提示:京东cookie 【${CookieJDs[i]}】填写不规范,可能会影响部分脚本正常使用。正确格式为: pt_key=xxx;pt_pin=xxx;（分号;不可少）\n`);
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['CookieJD' + index] = CookieJDs[i].trim();
}
