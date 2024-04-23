<template>
    <div class="p-4 rounded w-50 mx-auto mt-5">
        <div v-if="this.success" style="text-align:center;background-color: #EC6F13;
                    border: 5px solid blue; border-radius: 5px; font-weight: bolder; height:200px">
            <p style="font-size: 24px; margin:10px; margin-top:50px">{{ message }}</p>
            <br>
            <router-link :to="{ path: '/login' }" style="border: 2px solid rgba(0, 0, 0, 0.9); border-radius: 5px;
                padding:7px; text-decoration:none; color:rgba(0, 0, 0, 0.9); font-size: 18px;">
                    Đăng nhập ngay</router-link>
        </div>
    <Form v-else @submit="register" :validation-schema="userFormSchema" style="margin:auto; background-color: rgba(0, 0, 0, 0.9); border:7px solid #EC6F13; border-radius: 10px;">
        <div style="text-align:center; padding:10px; color:blue; font-size: 26px; font-weight: bold; border-bottom: 2px solid #EC6F13;">Đăng ký</div>
        <div class="row">
                <div class="col-sm">
                    <div class="row mb-4 mx-2 px-3 pt-3">
                        <label for="username" style="color:blue;font-size:19px;">Tên đăng nhập:</label>
                        <div class="col-sm">
                            <Field name="username" type="text" class="form-control" style="background-color:bisque;" v-model="User.MSNV"/>
                            <ErrorMessage name="username" class="error-feedback" />
                        </div>
                    </div>
                    <div class="row mb-4 mx-2 px-3 pt-3">
                        <label for="password"  style="color:blue;font-size:19px;">Mật khẩu:</label>
                        <div class="col-sm">
                            <Field name="password" type="password" class="form-control" style="background-color:bisque;" v-model="User.password"/>
                            <ErrorMessage name="password" class="error-feedback" />
                        </div>
                    </div>
                    <div class="row mb-4 mx-2 px-3 pt-3">
                        <label for="confirm_password" style="color:blue;font-size:19px;">Nhập lại mật khẩu:</label>
                        <div class="col-sm">
                            <Field name="confirm_password" type="password" class="form-control" style="background-color:bisque;"/>
                            <ErrorMessage name="confirm_password" class="error-feedback" />
                        </div>
                    </div>
                    <div class="row mb-4 mx-2 px-3 pt-3">
                        <label for="confirm_password" style="color:blue;font-size:19px;">Chức vụ:</label>
                        <div class="col-sm">
                            <Field name="chucvu" type="text" class="form-control" style="background-color:bisque;" v-model="User.chucVu"/>
                            <ErrorMessage name="chucvu" class="error-feedback" />
                        </div>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="row mb-4 mx-2 px-3 pt-3">
                        <label for="ho" style="color:blue;font-size:19px;">Họ và tên:</label>
                        <div class="col-sm">
                            <Field name="name" type="text" class="form-control" style="background-color:bisque;" v-model="User.hovatenNV"/>
                            <ErrorMessage name="name" class="error-feedback" />
                        </div>
                    </div>
                    <div class="row mb-4 mx-2 px-3 pt-3">
                        <label for="sdt"  style="color:blue;font-size:19px;">Số điện thoại:</label>
                        <div class="col-sm">
                            <Field name="phone" type="tel" class="form-control" style="background-color:bisque;" v-model="User.sdt"/>
                            <ErrorMessage name="phone" class="error-feedback" />
                        </div>
                    </div>
                    <div class="row mb-4 mx-2 px-3 pt-3">
                        <label for="diachi"  style="color:blue;font-size:19px;">Địa chỉ:</label>
                        <div class="col-sm">
                            <Field name="diachi" type="tel" class="form-control" style="background-color:bisque;" v-model="User.diaChi"/>
                            <ErrorMessage name="diachi" class="error-feedback" />
                        </div>
                    </div>
                </div>
                <p v-if="!this.success" class="ms-4 error-feedback">{{ message }}</p>
            <div style="text-align: center;">
                <button type="submit" class="col btn btn-outline-primary ms-3 py-2"
                        style="border: 2px solid #EC6F13; width:100px">Đăng ký</button>
                <br>
                <div style="padding: 10px; color:beige"><span  style="padding: 10px;">Bạn đã có tài khoản? <router-link :to="{ name: 'login' }">Đăng
                        Nhập</router-link></span></div>
                <br>
            </div>

            
        <!-- <div class="row">
            <label for="username" style="color:blue;font-size:19px;">Tên đăng nhập:</label>
            <div class="col-sm-9">
                <Field name="username" type="text" class="form-control" v-model="User.MSNV"/>
                <ErrorMessage name="username" class="error-feedback" />
            </div>
        </div>
        <div class="row mb-4 mx-2 px-3 pt-3">
            <label for="password" style="color:blue;font-size:19px;">Mật khẩu:</label>
            <div class="col-sm-9">
                <Field name="password" type="password" class="form-control" v-model="User.password"/>
                <ErrorMessage name="password" class="error-feedback" />
            </div>
        </div>
        <div class="row mb-4 mx-2 px-3 pt-3">
            <label for="confirm_password" style="color:blue;font-size:19px;">Nhập lại mật khẩu:</label>
            <div class="col-sm-9">
                <Field name="confirm_password" type="password" class="form-control"/>
                <ErrorMessage name="confirm_password" class="error-feedback" />
            </div>
        </div>
        <div class="row mb-4 mx-2 px-3 pt-3">
            <label for="name" style="color:blue;font-size:19px;">Họ và tên:</label>
            <div class="col-sm-9">
                <Field name="name" type="text" class="form-control" v-model="User.hovatenNV"/>
                <ErrorMessage name="name" class="error-feedback" />
            </div>
        </div>
        <div class="row mb-4 mx-2 px-3 pt-3">
            <label for="chucvu" style="color:blue;font-size:19px;">Chức vụ:</label>
            <div class="col-sm-9">
                <Field name="chucvu" type="text" class="form-control" v-model="User.chucVu"/>
                <ErrorMessage name="chucvu" class="error-feedback" />
            </div>
        </div>
        <div class="row mb-4 p-3 mx-2">
            <label for="diachi" style="color:blue;font-size:19px;">Địa chỉ:</label>
            <div class="col-sm-9">
                <Field name="diachi" type="tel" class="form-control" v-model="User.diaChi"/>
                <ErrorMessage name="diachi" class="error-feedback" />
            </div>
        </div>
        <div class="row mb-4 p-3 mx-2">
            <label for="phone" style="color:blue;font-size:19px;">Số điện thoại:</label>
            <div class="col-sm-9">
                <Field name="phone" type="tel" class="form-control" v-model="User.sdt"/>
                <ErrorMessage name="phone" class="error-feedback" />
            </div>
        </div>
        <p v-if="!this.success" class="ms-4 error-feedback">{{ message }}</p>
        <div>
            <button type="submit" class="col btn btn-outline-primary ms-4 py-2">Đăng ký</button>
            <span class="ms-3">Bạn đã có tài khoản? <router-link :to="{name: 'login'}">Đăng Nhập</router-link></span>
        </div> -->
        </div>
    </Form>
</div>
</template>
<style scoped>
    body{
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
    .error-feedback {
        color: red;
    }
</style>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import NvService from "@/services/nv.service";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        NvService
    },
    data() {
        const userFormSchema = yup.object().shape({
            username: yup
                .string()
                .required("Tên đăng nhập không được bỏ trống!")
                .min(4, "Tên đăng nhập phải ít nhất 4 ký tự!")
                .max(30,"Tên đăng nhập không quá 30 kí tự!"),
            password: yup
                .string()
                .required("Mật khẩu không được bỏ trống!")
                .min(4, "Mật khẩu phải ít nhất 4 ký tự!")
                .max(20,"Mật khẩu tối đa 20 ký tự!"),
            confirm_password: yup
                .string()
                .required("Mật khẩu xác nhận không được bỏ trống!")
                .min(4, "Mật khẩu phải ít nhất 4 ký tự!")
                .max(20,"Mật khẩu tối đa 20 ký tự!")
                .oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận không khớp!'),
            name: yup
                .string()
                .required("Tên không được bỏ trống!")
                .min(2, "Tên phải ít nhất 2 ký tự!")
                .max(50, "Tên có nhiều nhất 50 ký tự!"),
            chucvu: yup
                .string()
                .required("Chức vụ không được bỏ trống!")
                .min(2, "Chức vụ phải ít nhất 2 ký tự!")
                .max(50, "Chức vụ có nhiều nhất 50 ký tự!"),
            diachi: yup
                .string()
                .required("Địa chỉ không được bỏ trống!")
                .max(100, "Địa chỉ tối đa 100 ký tự!"),
            phone: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ!"
            )
        });
        return {
            User: {
                MSNV: "",
                password: "",
                hovatenNV:"",
                chucVu:"",
                diaChi:"",
                sdt:"",
            },
            userFormSchema,
            message: '',
            success:false,
        };
    },
    methods:{
        async register(){
            try {
                    const result = await NvService.create(this.User);
                    this.success = true;
                    this.message = "Đã đăng ký thành công!";
                } catch (error) {
                    this.message = error.response.data.message;
                }
        },
    }
}
</script>