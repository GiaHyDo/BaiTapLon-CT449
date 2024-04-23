const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const DocGiaService = require("../services/docgia.service");
const CryptoJS = require('crypto-js');
exports.create = async (req, res,next) => {
    try {
        const docGiaService = new DocGiaService(MongoDB.client);
        const isexits = await docGiaService.findById(req.body.maDocGia);
        if (isexits != null) return next (new ApiError(409,'Tên tài khoản đã tồn tại!'));
        const document = await docGiaService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "Lỗi khi tạo!!!")
        );
    }
};
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400,'Data to update can not be empty'));
    }

    try {
        const docGiaService = new DocGiaService(MongoDB.client);
        if(req.body.oldPassword)
        {
            const password = await docGiaService.decryptPassword(req.params.id);

            if(req.body.oldPassword != password)
            {
                return next(new ApiError(400, 'Mật khẩu không đúng!'));
            }
        }
        const document = await docGiaService.update(req.params.id, req.body);
        if(!document) {
            return next(new ApiError(404, 'Tài khoản không tồn tại!!!'));
        }
        return res.send({message: "Cập nhật tài khoản thành công!"});
    } catch (error) {
        return next (
            new ApiError(500, `Có lỗi khi cập nhật id=${req.params.id}` )
        );
    }
};
exports.login = async(req,res,next) => {
    try
    {
        const docGiaService = new DocGiaService(MongoDB.client);
        const docgia = await docGiaService.findById(req.body.maDocGia);
        if(!docgia)
        {
            return next(new ApiError(404, 'Tên đăng nhập không đúng!'));
        }
        else{
            const decryptedPassword = CryptoJS.AES.decrypt(docgia.password, "Bookrentstore", { iv: "BookrentstoreIV" }).toString(CryptoJS.enc.Utf8);
            if(decryptedPassword === req.body.password)
            {
                return res.send(docgia._id);
            }
            else
            {
                return next(new ApiError(404, 'Mật khẩu không đúng!'));
            }
        }
    }
    catch(error)
    {
        return next (
            new ApiError(500, "Lỗi đăng nhập!!!" )
        );
    }
}
exports.find = async (req,res,next) => {
    const docGiaService = new DocGiaService(MongoDB.client);
    try{
        let docs =  await docGiaService.find();
        return res.send(docs);
    }catch(error){
        return next(new ApiError(500,"Lấy danh sách tài khoản không thành công!"));
    }
}
exports.findById = async (req,res,next) => {
    const docGiaService = new DocGiaService(MongoDB.client);
    try
    {
        const docgia = await docGiaService.findById(req.params.id);
        if(!docgia)
        {
            return next (
                new ApiError(405, "Tài khoản không tồn tại!" )
            );
        }
        else
        {
            return res.send(docgia);
        }
    }
    catch(error)
    {
        return next (
            new ApiError(502, "Lỗi tìm kiếm!" )
        );
    }
} 
