<template>
    <div class="border border-3 border-primary rounded p-2" style="background-color:#EC6F13">
        <div style="text-align: center;"> 
            <h3><b>Các Nhà Xuất Bản</b></h3>
        </div>
        <router-link :to="{
            name: 'nxb-add'
        }">
            <button class="btn btn-sm btn-outline-primary" style="background-color: beige;color:black;
                        border:2px solid black;margin-bottom:10px"><b>Thêm mới NXB</b></button>
        </router-link>
        <table class="table" style="border: 2px solid black; margin-bottom:0px">
            <thead>
                <tr>
                    <th>Mã NXB</th>
                    <th>Tên NXB</th>
                    <th>Địa chỉ NXB</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="nxb in nxb" :key="nxb._id">
                    <td>{{ nxb._id }}</td>
                    <td style="color:#EC6F13;font-weight:bold">{{ nxb.tenNxb }}</td>
                    <td>{{ nxb.diaChi }}</td>
                    <td>
                        <router-link :to="{name: 'nxb-edit', params: { id: nxb._id }}">
                            <button class="btn btn-sm btn-outline-primary me-2" style="border:2px solid blue;color:#EC6F13"><b>Chỉnh sửa</b></button>
                        </router-link>
                        <button class="btn btn-sm btn-outline-danger" style="border:2px solid red;color:#EC6F13" @click=deleteNXB(nxb._id)><b>Xóa</b></button>
                    </td>

                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import NxbService from "@/services/nxb.service.js";
export default {
    data() {
        return {
            nxb: []
        }
    },
    methods: {
        async deleteNXB(id){
            if(confirm("Bạn có chắc chắn muốn xóa NXB số " + id + " không?"))
            {
                try{
                    await NxbService.delete(id);
                    alert("Xóa nhà xuất bản thành công");
                }
                catch (error) {
                    console.log(error);
                }
            }
        },
        async retrieveNxb() {
            try {
                this.nxb = await NxbService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.retrieveNxb();
    }

}
</script>