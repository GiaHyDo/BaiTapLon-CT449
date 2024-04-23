<template>
   <nav style="background-color:#EC6F13; height:50px; margin-bottom: 10px;">
        <div class="col-sm-1">
            <a href="/" class="name">GHYDER BOOK - ADMIN</a>
        </div>
        <div class="col-sm">
            <ul v-if="getUserName" class="nav" style="padding-top:6px; list-style: none; color:white; margin-top:0px; font-size: 18px; text-decoration:none;">
                <li class="nav-item">
                    <router-link :to="{ name: 'nxbview' }" class="nav-link text-dark">
                        <b><i class="fa-solid fa-address-book" title="Next Page"></i>
                            Quản lý Nhà Xuất Bản</b>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'rent-book' }" class="nav-link text-dark">
                        <b><i class="fa-solid fa-book-open-reader" title="Next Page"></i>
                            Quản lý mượn - trả sách</b>
                    </router-link>
                </li>
                <!-- <li class="nav-item">
                    <router-link :to="{ name: 'rent' }" class="nav-link text-dark">
                        <b>Đăng kí mượn</b>
                    </router-link>
                </li> -->
            </ul>
        </div>
        <div class="col-sm">
            <ul v-if="!getUserName" style="list-style: none;">
                <li style="position:absolute; top:10px; right:20px; font-size: 18px;color:black">
                    <router-link :to="{ name: 'register' }" class="nav-link text-dark">
                        <b>Đăng ký</b>
                    </router-link>
                </li>
                <li style="position:absolute; top:10px; right:98px; font-size: 18px;color:white">|</li>
                <li style="position:absolute; top:10px; right:110px; font-size: 18px;color:black">
                    <router-link :to="{ name: 'login' }" class="nav-link text-dark">
                        <b>Đăng nhập</b>
                    </router-link>
                </li>
            </ul>
            <ul v-else class="nav d-flex justify-content-end">
                <li style="position:absolute; top:5px; right:112px; font-size: 18px;color:black">
                    <router-link :to="{ name: 'nv-info', params: { MSNV: getUserName } }" class="nav-link text-dark">
                        <b>Thông tin</b>
                    </router-link>
                </li>
                <li style="position:absolute; top:12px; right:118px; font-size: 18px;color:white">|</li>
                <li style="position:absolute; top:5px; right:7px; font-size: 18px;color:black">
                    <a href="#" class="nav-link text-dark" @click="logout">
                        <b>Đăng xuất</b></a>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script>
export default {
    data() {
        return{
            userName: '',
        }
    },
    computed: {
        getUserName() {
            this.userName = sessionStorage.getItem('userName');
            return this.userName;
        }
    },
    methods: {
        logout() {
            if (confirm('Bạn có chắc muốn đăng xuất không?')) {
                sessionStorage.setItem("userName","");
                localStorage.removeItem('reloaded');
                this.userName = "";
                window.location.reload();
            }
        }
    },
    mounted(){
        if(!this.userName)
        {
            this.$router.push({name: "homeBook"});
        }
    }
};
</script>

<style scoped>
    .name {
        color: white;
        font-size: 23px;
        text-decoration:none;
        text-shadow:3px 3px 10px black;
        font-weight: bold;
        top:10px;
        left:520px;
        position:absolute
    }

    .name:hover {
        font-size: 24px;
        top:9px;
        left:518px;
    }
</style>