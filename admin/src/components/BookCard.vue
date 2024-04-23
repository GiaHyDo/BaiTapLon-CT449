<script>
import NxbService from "@/services/nxb.service.js";
import { string } from "yup";
export default {
   props: {
       book: { type: Object, required: true },
       tenNXB: { type: String, required:true},
   },
};
</script>

<template>
   <div style="font-size: 18px;">
       <div class="p-1">
           <strong style="color:beige"> Tên sách:
            <b style="color:#EC6F13"> {{ book.tenSach }}</b></strong>
       </div>
       <div class="p-1">
           <strong style="color:beige">Đơn Giá:
           <b style="color:#EC6F13"> {{ book.donGia }}</b></strong>
       </div>
       <div class="p-1">
           <strong style="color:beige">Số Quyển:
           <b style="color:#EC6F13"> {{ book.soQuyen }}</b></strong>
       </div>
       <div class="p-1">
           <strong style="color:beige">Năm Xuất Bản:
           <b style="color:#EC6F13"> {{ book.namXuatBan }}</b></strong>
       </div>
       <div class="p-1">
           <strong style="color:beige">Nhà Xuất Bản:
           <b style="color:#EC6F13"> {{ tenNXB }}</b></strong>
       </div>
       <div class="p-1">
           <strong style="color:beige">Tác Giả:
           <b style="color:#EC6F13"> {{ book.tacGia }}</b></strong>
       </div>
   </div>
</template>