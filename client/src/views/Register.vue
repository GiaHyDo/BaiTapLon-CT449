<template>
    <div class="p-4 rounded w-50 mx-auto mt-5">
        <div>
            <marquee style="font-size: 18px;font-weight: bolder; color:bisque">Đăng ký tài khoản ngay!</marquee>
        </div>
        <div v-if="this.success" style="text-align:center;background-color: #EC6F13;
                    border: 5px solid blue; border-radius: 5px; font-weight: bolder; height:200px">
            <p style="font-size: 24px; margin:10px; margin-top:50px">{{ message }}</p>
            <br>
            <router-link :to="{ path: '/login' }" style="border: 2px solid rgba(0, 0, 0, 0.9); border-radius: 5px;
                padding:7px; text-decoration:none; color:rgba(0, 0, 0, 0.9); font-size: 18px;">
                    Đăng nhập ngay</router-link>
        </div>
        <Form v-else @submit="register" :validation-schema="userFormSchema"
                    style="margin:auto; background-color: rgba(0, 0, 0, 0.9); border:7px solid #EC6F13; border-radius: 10px;">
            <div style="text-align:center; padding:10px; color:blue; font-size: 26px; font-weight: bold; border-bottom: 2px solid #EC6F13;">Đăng Ký</div>
            <div class="row">
                <div class="col-sm">
                    <div class="row mb-4 mx-2 px-3 pt-3">
                        <label for="username" style="color:blue;font-size:19px;">Tên đăng nhập:</label>
                        <div class="col-sm">
                            <Field name="username" type="text" class="form-control" style="background-color:bisque;" v-model="User.maDocGia" />
                            <ErrorMessage name="username" class="error-feedback" />
                        </div>
                    </div>
                    <div class="row mb-4 mx-2 px-3 pt-3">
                        <label for="password"  style="color:blue;font-size:19px;">Mật khẩu:</label>
                        <div class="col-sm">
                            <Field name="password" type="password" class="form-control" style="background-color:bisque;" v-model="User.password" />
                            <ErrorMessage name="password" class="error-feedback" />
                        </div>
                    </div>
                    <div class="row mb-4 mx-2 px-3 pt-3">
                        <label for="confirm_password"  style="color:blue;font-size:19px;">Nhập lại mật khẩu:</label>
                        <div class="col-sm">
                            <Field name="confirm_password" type="password" style="background-color:bisque;" class="form-control" />
                            <ErrorMessage name="confirm_password" class="error-feedback" />
                        </div>
                    </div>
                    <div class="row mb-4 mx-2 px-3 pt-3">
                        <label for="sdt"  style="color:blue;font-size:19px;">Số điện thoại:</label>
                        <div class="col-sm">
                            <Field name="sdt" type="tel" class="form-control" style="background-color:bisque;" v-model="User.dienThoai" />
                            <ErrorMessage name="sdt" class="error-feedback" />
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="row mb-4 mx-2 px-3 pt-3" >
                        <label for="phai" style="color:blue;font-size:19px;">Giới tính:</label>
                        <div class="col-sm">
                            <select name="phai" v-model="User.phai" class="form-select" style="background-color:bisque;">
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                            <ErrorMessage name="phai" class="error-feedback" />
                        </div>
                    </div>
                    <div class="row mb-4 mx-2 px-3 pt-3">
                        <label for="ho" style="color:blue;font-size:19px;">Họ:</label>
                        <div class="col-sm">
                            <Field name="ho" type="text" class="form-control" style="background-color:bisque;" v-model="User.hoLot" />
                            <ErrorMessage name="ho" class="error-feedback" />
                        </div>
                    </div>
                    <div class="row mb-4 mx-2 px-3 pt-3">
                        <label for="ten"  style="color:blue;font-size:19px;">Tên:</label>
                        <div class="col-sm">
                            <Field name="ten" type="text" class="form-control" style="background-color:bisque;" v-model="User.ten" />
                            <ErrorMessage name="ten" class="error-feedback" />
                        </div>
                    </div>
                    <div class="row mb-4 mx-2 px-3 pt-3">
                        <label for="diachi"  style="color:blue;font-size:19px;">Địa chỉ:</label>
                        <div class="col-sm">
                            <Field name="diachi" type="text" class="form-control" style="background-color:bisque;" v-model="User.diaChi" />
                            <ErrorMessage name="diachi" class="error-feedback" />
                        </div>
                    </div>
                </div>
            </div>
            <p v-if="!this.success" class="ms-4 error-feedback">{{ message }}</p>
            <div style="text-align: center;">
                <button type="submit" class="col btn btn-outline-primary ms-3 py-2" style="border: 2px solid #EC6F13">Đăng ký</button>
                <br>
                <div style="padding: 10px;"><span  style="padding: 10px;">Bạn đã có tài khoản? <router-link :to="{ name: 'login' }">Đăng
                        Nhập</router-link></span></div>
                <br>
            </div>
        </Form>
    </div>
</template>
<style scoped>
.error-feedback {
    color: red;
}
</style>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import DocGiaService from "@/services/docgia.service";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        DocGiaService
    },
    data() {
        const userFormSchema = yup.object().shape({
            username: yup
                .string()
                .required("Tên đăng nhập không được bỏ trống!")
                .min(4, "Tên đăng nhập phải ít nhất 4 ký tự!")
                .max(30, "Tên đăng nhập không quá 30 kí tự!"),
            password: yup
                .string()
                .required("Mật khẩu không được bỏ trống.")
                .min(4, "Mật khẩu phải ít nhất 4 ký tự.")
                .max(20, "Mật khẩu tối đa 20 ký tự."),
            confirm_password: yup
                .string()
                .required("Mật khẩu xác nhận không được bỏ trống.")
                .min(4, "Mật khẩu phải ít nhất 4 ký tự.")
                .max(20, "Mật khẩu tối đa 20 ký tự.")
                .oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận không trùng khớp.'),
            ho: yup
                .string()
                .required("Tên không được bỏ trống.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            ten: yup
                .string()
                .required("Tên không được bỏ trống.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            diachi: yup
                .string()
                .required("Địa chỉ không được bỏ trống.")
                .max(100, "Địa chỉ tối đa 100 ký tự."),
            sdt: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                )
        });
        return {
            User: {
                maDocGia: "",
                password: "",
                hoLot: "",
                ten: "",
                phai: "Nam",
                diaChi: "",
                dienThoai: "",
            },
            userFormSchema,
            message: '',
            success: false,
        };
    },
    methods: {
        async register() {
            try {
                const result = await DocGiaService.create(this.User);
                this.success = true;
                this.message = "Đăng ký tài khoản thành công!";
            } catch (error) {
                this.message = error.response.data.message;
            }
        },
    }
}
</script>