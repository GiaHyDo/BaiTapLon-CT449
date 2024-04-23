<template>
    <div style="margin: auto;width: 80%; margin-top:10px; background-color:rgba(0, 0, 0, 0.9); border: 3px solid blue;
                border-radius: 5px;">
        <div style="border-bottom: 1px solid blue; margin-bottom: 20px;">
            <h2 style="font-size:26px; margin-top:10px; margin-left: 300px; color:#EC6F13"><b>Thông Tin Tài Khoản</b></h2>
        </div>
        <table style="text-align:left; margin-left:260px; width:440px; font-size: 18px;">
            <tbody style="color:#EC6F13;">
                <tr style="">
                    <th scope="row" style="color:beige">Tên tài khoản:</th>
                    <td style=""><b>{{ user._id }}</b></td>
                </tr>
                <tr>
                    <th scope="row" style="color:beige">Họ độc giả:</th>
                    <td><b>{{ user.hoLot }}</b></td>
                </tr>
                <tr>
                    <th scope="row" style="color:beige">Tên độc giả:</th>
                    <td><b>{{ user.ten }}</b></td>
                </tr>
                <tr>
                    <th scope="row" style="color:beige">Giới tính:</th>
                    <td><b>{{ user.phai }}</b></td>
                </tr>
                    <th scope="row" style="color:beige">Số điện thoại:</th>
                    <td><b>{{ user.dienThoai }}</b></td>
                <tr>
                    <th scope="row" style="color:beige">Địa chỉ:</th>
                    <td><b>{{ user.diaChi }}</b></td>
                </tr>
            </tbody>
        </table>
        <div class="d-flex" style="margin-top:20px;">
            <div>
            <button style="border:2px solid blue; border-radius: 5px; background-color:#EC6F13;
                            margin-left:260px;height:40px" @click="ChangeInfoField()">
                <b>Cập nhật thông tin</b></button>
            </div>
            <div>
            <button style="border:2px solid #EC6F13; border-radius: 5px; background-color:rgba(0, 0, 0, 0.9);
                            margin-left:40px; height:40px; color:#EC6F13" class="btn btn-sm btn-primary me-2" @click="ChangePassField()">
                <b>Đổi mật khẩu</b></button>
        </div>
        </div>
        <p>{{ message }}</p>
        <Form @submit="changePassword" :validation-schema="passwordFormSchema" v-if="changePassField"
            class="mt-3 rounded border-3 p-2" style="background: rgba(0, 0, 0, 0.9); color:#EC6F13; border: 2px solid #EC6F13">
            <h5 class="text-center" style="font-size: 26px;">Đổi Mật Khẩu</h5>
            <div class="row">
                <div class="col-md">
                    <label for="old_password" class="form-label">Nhập mật khẩu cũ:</label>
                    <Field type="password" name="old_password" class="form-control mb-3"
                        v-model="changePass.oldPassword" style="background-color: bisque;"/>
                    <ErrorMessage name="old_password" class="error-feedback" />
                </div>
                <div class="col-md">
                    <label for="new_password" class="form-label">Nhập mật khẩu mới:</label>
                    <Field type="password" name="new_password" class="form-control mb-3"
                        v-model="changePass.password" style="background-color: bisque;" />
                    <ErrorMessage name="new_password" class="error-feedback" />
                </div>
                <div class="col-md">
                    <label for="confirm_password" class="form-label">Nhập lại mật khẩu mới:</label>
                    <Field type="password" name="confirm_password" class="form-control mb-3"
                        style="background-color: bisque;"/>
                    <ErrorMessage name="confirm_password" class="error-feedback" />
                </div>
            </div>
            <button style="width:150px; height:35px; margin-left:340px; margin-top:10px;
                    color: #EC6F13; background-color:rgba(0, 0, 0, 0.9); border: 2px solid #EC6F13;border-radius: 5px;">
                <b>Cập nhật</b></button>
        </Form>
        <Form @submit="changeUserInfo()" :validation-schema="userFormSchema" v-if="changeInfoField"
            class="mt-3 border rounded border-3 p-2" style="background-color: #EC6F13; color:black; border: 2px solid blue">
            <h5 class="text-center" style="font-size: 26px;">Cập Nhật Thông Tin</h5>
            <div class="row">
                <div class="col-md">
                    <div class="col-md">
                        <label for="ho" class="form-label">Họ độc giả:</label>
                        <Field type="text" name="ho" class="form-control mb-3" style="background-color: bisque;" v-model="changeInfo.hoLot" />
                        <ErrorMessage name="ho" class="error-feedback" />
                    </div>
                    <div class="col-md">
                        <label for="diachi" class="form-label">Địa chỉ:</label>
                        <Field type="text" name="diachi" class="form-control mb-3" style="background-color: bisque;" v-model="changeInfo.diaChi" />
                        <ErrorMessage name="diachi" class="error-feedback" />
                    </div>
                    <label for="phai" class="col-md fw-bold">Giới tính:</label>
                    <div class="col-sm">
                        <select name="phai" v-model="changeInfo.phai" class="form-select">
                            <option selected value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                        <ErrorMessage name="phai" class="error-feedback" />
                    </div>
                </div>
                <div class="col-md">
                    <div class="col-md">
                        <label for="ten" class="form-label">Tên độc giả:</label>
                        <Field type="text" name="ten" class="form-control mb-3" style="background-color: bisque;" v-model="changeInfo.ten" />
                        <ErrorMessage name="ten" class="error-feedback" />
                    </div>
                    <div class="col-md">
                        <label for="sdt" class="form-label">Số điện thoại:</label>
                        <Field type="text" name="sdt" class="form-control mb-3" style="background-color: bisque;" v-model="changeInfo.dienThoai" />
                        <ErrorMessage name="sdt" class="error-feedback" />
                    </div>
                </div>
            </div>
            <button style="width:150px; height:35px; margin-left:340px; margin-top:15px;
                        color: #EC6F13; background-color:rgba(0, 0, 0, 0.9); border: 2px solid blue;border-radius: 5px;">
                    <b>Cập nhật</b></button>
        </Form>
    </div>
</template>
<style scoped>
.error-feedback {
    color: red;
}
</style>
<script>
import DocGiaService from "@/services/docgia.service";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        DocGiaService
    },
    data() {
        const passwordFormSchema = yup.object().shape({
            old_password: yup
                .string()
                .required("Mật khẩu không được bỏ trống!")
                .min(4, "Mật khẩu phải có ít nhất 4 ký tự!"),
            new_password: yup
                .string()
                .required("Mật khẩu không được bỏ trống!")
                .min(4, "Mật khẩu phải có ít nhất 4 ký tự!"),
            confirm_password: yup
                .string()
                .required("Mật khẩu không được bỏ trống!")
                .min(4, "Mật khẩu phải có ít nhất 4 ký tự!")
                .oneOf([yup.ref('new_password'), null], 'Mật khẩu xác nhận không khớp!'),
        });
        const userFormSchema = yup.object().shape({
            ho: yup
                .string()
                .required("Tên không được bỏ trống!")
                .min(2, "Tên phải có ít nhất 2 ký tự!")
                .max(50, "Tên có nhiều nhất 50 ký tự!"),
            ten: yup
                .string()
                .required("Tên không được bỏ trống!")
                .min(2, "Tên phải có ít nhất 2 ký tự!")
                .max(50, "Tên có nhiều nhất 50 ký tự!"),
            diachi: yup
                .string()
                .required("Địa chỉ không được bỏ trống!")
                .max(100, "Địa chỉ tối đa 100 ký tự!"),
            sdt: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ!"
                )
        });
        return {
            user: {},
            changePassField: false,
            changeInfoField: false,
            userFormSchema,
            passwordFormSchema,
            userName: "",
            changePass: {
                oldPassword: "",
                password: "",
            },
            changeInfo: {
                hoLot: "",
                ten: "",
                phai: "",
                diaChi: "",
                dienThoai: "",
            },
            message: "",
        }
    },
    methods: {
        async getUserData() {
            try {
                this.user = await DocGiaService.get(sessionStorage.getItem("userName"));
            } catch (error) {
                console.log(error);
            }
        },
        ChangePassField() {
            this.changeInfoField = false;
            this.changePassField = !this.changePassField;
        },
        ChangeInfoField() {
            this.changeInfo.hoLot = this.user.holot;
            this.changeInfo.ten = this.user.ten;
            this.changeInfo.phai = this.user.phai;
            this.changeInfo.diaChi = this.user.diaChi;
            this.changeInfo.dienThoai = this.user.dienThoai;
            this.changePassField = false;
            this.changeInfoField = !this.changeInfoField;
        },
        async changePassword() {
            try {
                const result = await DocGiaService.update(this.userName, this.changePass);
                // this.message = "Cập nhật mật khẩu thành công!";
                alert("Đổi mật khẩu thành công!");
                this.changePassField = false;
            } catch (error) {
                this.message = error.response.data.message;
            }
        },
        async changeUserInfo() {
            try {
                const result = await DocGiaService.update(this.userName, this.changeInfo);
                // this.message = result.message;
                alert("Cập nhật thông tin thành công!");
                this.getUserData();
                this.changeInfoField = false;
            } catch (error) {
                console.log(error);
                this.message = error.response.data.message;
            }
        },
    },
    mounted() {
        this.userName = sessionStorage.getItem("userName");
        this.getUserData();
    }
}
</script>