<template>
    <nav style="background-color:#EC6F13; height:50px; margin-bottom: 10px;">
        <div class="col-md-4 d-flex">
            <div style="">
                <a href="/" class="name">GHYDER BOOK</a>
            </div>
            <ul v-if="getUserName" style="padding-top:6px; list-style: none; color:white; margin-top:5px; font-size: 20px; text-decoration:none;">
                <li class="nav-item">
                    <router-link :to="{ name: 'rentList' }" style="padding-top:6px; color:black; margin-top:5px; font-size: 20px; text-decoration:none;">
                        <b><i class="fa-solid fa-list" title="Next Page"></i>
                        Danh sách mượn</b>
                    </router-link>
                </li>
            </ul>
        </div>
        <div>
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
                    <router-link :to="{ name: 'docgia-info', params: { maDocGia: getUserName } }" class="nav-link text-dark">
                        <b>Cá nhân</b>
                    </router-link>
                </li>
                <li style="position:absolute; top:12px; right:118px; font-size: 18px;color:white">|</li>
                <li style="position:absolute; top:5px; right:7px; font-size: 18px;color:black">
                    <a href="#" class="nav-link text-dark" @click="logout"><b>Đăng xuất</b></a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
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
                sessionStorage.removeItem("userName");
                localStorage.removeItem('reloaded');
                this.userName = "";
                window.location.reload();
            }
        }
    },
    mounted() {
        this.getUserName;
        if (!this.userName) {
            this.$router.push({ name: "login" });
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
        left:570px;
        position:absolute
    }

    .name:hover {
        font-size: 24px;
        top:9px;
        left:568px;
    }
</style>