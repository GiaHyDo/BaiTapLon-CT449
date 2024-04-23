<script>
import NvService from "@/services/nv.service.js";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    props: {
        MSNV: { type: String, required: true },
    },
    components:{
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const passwordFormSchema = yup.object().shape({
            old_password: yup
                .string()
                .required("Mật khẩu không được bỏ trống!")
                .min(4, "Mật khẩu phải ít nhất 4 ký tự!"),
            new_password: yup
                .string()
                .required("Mật khẩu không được bỏ trống!")
                .min(4, "Mật khẩu phải ít nhất 4 ký tự!"),
            confirm_password: yup
                .string()
                .required("Mật khẩu không được bỏ trống!")
                .min(4, "Mật khẩu phải ít nhất 4 ký tự!")
                .oneOf([yup.ref('new_password'), null], 'Mật khẩu xác nhận không khớp!'),
        });
        const userFormSchema = yup.object().shape({
            chucvu: yup
                .string()
                .required("Chức vụ không được bỏ trống!")
                .min(2,"Chức vụ phải ít nhất 2 ký tự!")
                .max(50, "Chức vụ có nhiều nhất 50 ký tự!"),
            ten: yup
                .string()
                .required("Tên không được bỏ trống!")
                .min(2, "Tên phải ít nhất 2 ký tự!")
                .max(50, "Tên có nhiều nhất 50 ký tự!"),
            diachi: yup
                .string()
                .required("Địa chỉ không được bỏ trống!")
                .max(100, "Địa chỉ tối đa 100 ký tự!"),
            sdt: yup
                .string()
                .required("Số điện thoại không được bỏ trống!")
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ!"
                )
        });
        return {
            nv: [],
            changePassField: false,
            changeInfoField: false,
            userFormSchema,
            passwordFormSchema,
            changePass: {
                oldPassword: "",
                password: "",
            },
            changeInfo: {
                hovatenNV: "",
                chucVu: "",
                diaChi: "",
                sdt: "",
            },
            message: "", // Thêm biến message để lưu thông báo
            errorMessageColor: "red", // Màu của thông báo lỗi
        }
    },
    methods: {
        async getNv() {
            try {
                this.nv = await NvService.get(this.MSNV);
            }
            catch (error) {
                console.log(error);
            }
        },
        ChangePassField() {
            this.changeInfoField = false;
            this.changePassField = !this.changePassField;
        },
        ChangeInfoField() {
            this.changeInfo.hovatenNV = this.nv.hovatenNV;
            this.changeInfo.diaChi = this.nv.diaChi;
            this.changeInfo.sdt = this.nv.sdt;
            this.changeInfo.chucVu = this.nv.chucVu;
            this.changePassField = false;
            this.changeInfoField = !this.changeInfoField;
        },
        async changePassword() {
            try {
                await NvService.update(this.nv._id, this.changePass);
                // this.message = "Cập nhật mật khẩu thành công!";
                alert("Đổi mật khẩu thành công!");
                this.changePassField = false;
            } catch (error) {
                this.message = error.response.data.message;
            }
        },
        async changeUserInfo() {
            try {
                const result = await NvService.update(this.nv._id, this.changeInfo);
                this.message = result.message;
                this.getNv();
                this.changeInfoField = false;
            } catch (error) {
                console.log(error);
                this.message = error.response.data.message;
            }
        },
    },
    created() {
        this.getNv();
    }
}
</script>
<style scoped>
.error-feedback {
    color: red;
}
</style>
<template>
    <div style="width: 70%; margin-left: 160px; background-color:rgba(0, 0, 0, 0.9); border:2px solid #EC6F13">
        <div style="text-align: center;">
            <h3 style="color: #EC6F13; padding-top:10px;"><b>Thông Tin Nhân Viên</b></h3>
        </div>
        <div v-if="nv" style="text-align: center;">
            <table class="table" style="background-color:#EC6F13">
                <tbody>
                    <tr>
                        <td scope="col" style="color:#EC6F13;font-weight:bold;">Mã số nhân viên: </td>
                        <td><b>{{ nv._id }}</b></td>
                    </tr>
                    <tr>
                        <td scope="col" style="color:#EC6F13;font-weight:bold;">Họ tên: </td>
                        <td><b>{{ nv.hovatenNV }}</b></td>
                    </tr>
                    <tr>
                        <td scope="col" style="color:#EC6F13;font-weight:bold;">Chức vụ: </td>
                        <td><b>{{ nv.chucVu }}</b></td>
                    </tr>
                    <tr>
                        <td scope="col" style="color:#EC6F13;font-weight:bold;">Địa chỉ: </td>
                        <td><b>{{ nv.diaChi }}</b></td>
                    </tr>
                    <tr>
                        <td scope="col" style="color:#EC6F13;font-weight:bold;">Số điện thoại: </td>
                        <td><b>{{ nv.sdt }}</b></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="d-flex">
            <button style="border:2px solid blue; border-radius: 5px; background-color:#EC6F13;
                            margin-left:245px;height:40px" @click="ChangePassField()"><b>Đổi mật khẩu</b></button>
            <button style="border:2px solid #EC6F13; border-radius: 5px; background-color:rgba(0, 0, 0, 0.9);
                            margin-left:30px; height:40px; color:#EC6F13" @click="ChangeInfoField()"><b>Cập nhật thông tin</b></button>
        </div>
        <p style="color:red">{{ message }}</p>
        <Form @submit="changePassword" :validation-schema="passwordFormSchema" v-if="changePassField"
            class="mt-3 border rounded border-3 p-2" style="background: #FBF6E5;">
            <div style="text-align: center;">
                <h5 class="text-center" style="font-size:22px;"><b>Đổi Mật Khẩu</b></h5>
            </div>
            <div class="row">
                <div class="col-md">
                    <label for="old_password" class="form-label" style="text-align: left;"><b>Nhập mật khẩu cũ:</b></label>
                    <Field type="password" name="old_password" class="form-control mb-3"
                        v-model="changePass.oldPassword" />
                    <ErrorMessage name="old_password" class="error-feedback" />
                </div>
                <div class="col-md">
                    <label for="new_password" class="form-label"><b>Nhập mật khẩu mới:</b></label>
                    <Field type="password" name="new_password" class="form-control mb-3"
                        v-model="changePass.password" />
                    <ErrorMessage name="new_password" class="error-feedback" />
                </div>
                <div class="col-md">
                    <label for="confirm_password" class="form-label"><b>Xác nhận mật khẩu mới:</b></label>
                    <Field type="password" name="confirm_password" class="form-control mb-3"/>
                    <ErrorMessage name="confirm_password" class="error-feedback" />
                </div>
            </div>
            <button style="width:150px; height:35px; margin-left:300px; margin-top:15px;
                        color: #EC6F13; background-color:rgba(0, 0, 0, 0.9); border: 2px solid #EC6F13;border-radius: 5px;">
                    <b>Cập nhật</b></button>
        </Form>
        <Form @submit="changeUserInfo()" :validation-schema="userFormSchema" v-if="changeInfoField"
            class="mt-3 border rounded border-3 p-2" style="background: #FBF6E5;">
            <h5 class="text-center" style="font-size: 22px;"><b>Cập Nhật Thông Tin</b></h5>
            <div class="row">
                <div class="col-md">
                    <div class="col-md">
                        <label for="ten" class="form-label"><b>Họ và tên:</b></label>
                        <Field type="text" name="ten" class="form-control mb-3" v-model="changeInfo.hovatenNV" />
                        <ErrorMessage name="ten" class="error-feedback" />
                    </div>
                    <div class="col-md">
                        <label for="sdt" class="form-label"><b>Số điện thoại:</b></label>
                        <Field type="text" name="sdt" class="form-control mb-3" v-model="changeInfo.sdt" />
                        <ErrorMessage name="sdt" class="error-feedback" />
                    </div>
                </div>
                <div class="col-md">
                    <div class="col-md">
                        <label for="chucvu" class="form-label"><b>Chức vụ:</b></label>
                        <Field type="text" name="chucvu" class="form-control mb-3" v-model="changeInfo.chucVu" />
                        <ErrorMessage name="chucvu" class="error-feedback" />
                    </div>
                    <div class="col-md">
                        <label for="diachi" class="form-label"><b>Địa chỉ</b></label>
                        <Field type="text" name="diachi" class="form-control mb-3" v-model="changeInfo.diaChi" />
                        <ErrorMessage name="diachi" class="error-feedback" />
                    </div>
                </div>
            </div>
            <button class="btn btn-sm btn-outline-primary mt-3" style="width: 30%;">Lưu</button>
        </Form>
    </div>
</template>

