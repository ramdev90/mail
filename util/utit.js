module.exports = function getSubject() {
    return 'Subject';
}


module.exports = function getMessage(name) {
    const msg = `
     <p>Hi ${name},</p>
    
    <p>My name is Ramdev, and I came across your Upwork profile. I'm currently looking to collaborate with developers on an Angular project.</p>
    
    <p>If you're interested, I'd love to discuss how we can work together. Let me know if you'd be open to a quick chat!</p>

    <p>Additionally, I wanted to share that I hold a MongoDB certification, which may be useful for your projects as well. You can check it out here: <a href="https://learn.mongodb.com/c/funC-3dQQSecEU9U0Onr1A">MongoDB Certification</a>.</p>
    
    <p>Looking forward to hearing from you.</p>
    
    <p>Best regards,<br>Ramdev<br>
    https://www.fiverr.com/webs_dev 50+ reviews <br>
    https://www.linkedin.com/in/rathod-ramdevbhai/<br>
    https://www.upwork.com/fl/~0194a63c4eedcd1739?mp_source=share
    </p>
    `
    return msg;
}

