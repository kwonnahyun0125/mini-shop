var express = require('express');
var router = express.Router();
const multer = require('multer');
var fs = require('fs');
var path = require('path'); 
const { db } = require('../utils/db');


// 파일 업로드시 uploads 폴더에 저장되도록 설정
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// multer 미들웨어 설정
const upload = multer({dest: 'uploads/'});


// GET /documents - 모든 문서 리스트 조회
router.get('/list', async (req, res, next) => {
  const docs = await db.document.findMany({
    orderBy: {createdAt: 'desc'},
  });
  res.json({ requestTime: req.requestTime, documents: docs});
}); 


// POST /documents/upload - 파일 업로드
router.post('/upload',upload.single('file'), async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({error: 'No file uploaded'});
  }

  const { originalname, filename } = req.file;
  const extension = path.extname(originalname);
  const newFileName = `${filename}${extension}`;
  const newFilePath = path.join(uploadDir, newFileName);
  fs.renameSync(req.file.path, newFilePath);

  // req.file.originalname;
  // req.file.mimtype;
  // req.file.size;
  // '/Documents/files/${newFileName}';
  const file = await db.document.create({
    data: {
      filename: newFileName,
      mimetype: req.file.mimetype,
      size: req.file.size,
      url: `/documents/files/${newFileName}`,
    },
  });
  // filename String
  // mimetype  String
  // size  Int
  // url String


    res.json({message: 'OK'});
});

module.exports = router;
