<template>
    <div>
        <div style="width: 50%;" class="mx-auto mt-5">
            <h3 class="text-center mb-2" style="color:#EC6F13;margin-top:10px">Thêm Nhà Xuất Bản</h3>
            <NXBForm :nxb="nxb" :type="type" @submit:nxb="addNxb" />
        </div>
    </div>
</template>

<script>
import NXBForm from "@/components/NxbForm.vue";
import NxbService from "@/services/nxb.service.js";

export default {
    components: {
        NXBForm
    },
    data() {
        return {
            nxb: {
                maNxb: "",
                tenNxb: null,
                diaChi: null
            },
            type: "add",
        };

    },
    methods: {
        async addNxb(data) {
            try {
                await NxbService.create(data);
                alert("Thêm nhà xuất bản thành công!");
            } catch (error) {
                console.log(error);
            }
        }
    },
};
</script>