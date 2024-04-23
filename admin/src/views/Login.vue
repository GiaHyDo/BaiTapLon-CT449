<template>
    <div class="p-4 rounded w-50 mx-auto mt-5">
    <Form @submit="login" :validation-schema="userFormSchema" style="margin:auto; background-color: rgba(0, 0, 0, 0.9); border:7px solid #EC6F13; border-radius: 10px;">
        <div style="text-align:center; padding:10px; color:blue; font-size: 26px; font-weight: bold; border-bottom: 2px solid #EC6F13;">Đăng nhập - Admin</div>
        <div class="row mb-4 mx-2 px-3 pt-3">
            <label for="username" style="color:blue;font-size:19px;">Tên đăng nhập:</label>
            <div class="col-sm-12">
                <Field name="username" type="text" class="form-control" style="background-color:bisque;" v-model="User.MSNV"/>
                <ErrorMessage name="username" class="error-feedback" />
            </div>
        </div>
        <div class="row mb-4 p-3 mx-2">
            <label for="password" style="color:blue;font-size:19px;">Mật khẩu:</label>
            <div class="col-sm-12">
                <Field name="password" type="password" class="form-control" style="background-color:bisque;" v-model="User.password"/>
                <ErrorMessage name="password" class="error-feedback" />
            </div>
        </div>
        <p class="ms-4 error-feedback">{{ message }}</p>
        <div style="margin-left:170px;">
            <button type="submit" class="col btn btn-outline-primary ms-3 py-2" style="border: 2px solid #EC6F13">Đăng Nhập</button>
        </div>
        <br>
        <div> <span style="margin-left:125px; color:beige">Bạn chưa có tài khoản? </span><router-link :to="{name: 'register'}">Đăng Ký</router-link></div>
        <br>
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
                .max(20,"Mật khẩu không quá 20 kí tự!"),            
        });
        return {
            User: {
                MSNV: "",
                password: "",
            },
            userFormSchema,
            message: '',
        };
    },
    methods:{
        async login(){
            try {
                    const user = await NvService.login(this.User);
                    sessionStorage.setItem('userName', user);
                    this.$router.replace({name: "homeBook"});
                } catch (error) {
                    this.message = error.response.data.message;
                }
        },
    },
}
</script>