    <template>
        <div>
        <div class="row">
            <div class="col-4" v-for="(row, rowIndex) in chunkedBooks" :key="rowIndex">
            <ul class="list-group">
                <li class="list-group-item list-group-item-action list-group-item-info" v-for="(book, index) in row" :key="book._id" @click="showBook(rowIndex * 3 + index)" :class="{ 'active': (rowIndex * 3 + index) === bookIndex }">
                <span style="font-size: 28px; color:black"><b>{{ book.tenSach }}</b></span>
                <div>
                    <i class="fa-solid fa-book-tanakh" id="myIcon" style="margin:20px; font-size:150px; margin-left:88px; color:azure;"></i>
                </div>
                <div v-if="book.soQuyen > 0" style="margin-left:210px; margin-top:18px; color:black">
                    Đang có: <b>{{ book.soQuyen }}</b>
                </div>
                <div v-else style="margin-left:230px; margin-top:18px; color:red; font-size: 18px;;"><b>Đã hết!</b></div>
                <div v-else style="margin-left:230px; margin-top:18px; color:red; font-size: 18px;"><b>Đã hết!</b></div>
                <!-- Thêm chữ HOT -->
                <div v-if="book.soQuyen < 30" class="hot-label">HOT</div>
            </li>
            </ul>
            </div>
        </div>
        </div>
    </template>
  
    <script>
    export default {
        props: {
        books: { type: Array, required: true },
        },
        data() {
        return {
            bookIndex: -1,
        }
        },
        emits: ["show:book"],
        computed: {
        chunkedBooks() {
            const chunkSize = 3;
            const chunkedArray = [];
            for (let i = 0; i < this.books.length; i += chunkSize) {
            chunkedArray.push(this.books.slice(i, i + chunkSize));
            }
            return chunkedArray;
        }
        },
        methods: {
        showBook(bookIndex) {
            if (this.bookIndex === bookIndex) {
            this.bookIndex = -1;
            } else {
            this.bookIndex = bookIndex;
            }
            this.$emit("show:book", this.bookIndex);
        }
        }
    }
    </script>

    <style scoped>
        /* Thiết lập khoảng cách giữa các cuốn sách */
    .list-group-item {
    height: 300px;
    background-color: rgb(230, 134, 25);
    margin-bottom: 10px;
    border: 3px solid rgb(41, 23, 179);
    border-radius: 5px;
    position: relative; /* Thêm thuộc tính position */
    }

    .list-group-item:hover {
    height: 305px;
    background-color: rgb(255, 136, 0);
    margin-bottom: 10px;
    border: 3px solid white;
    border-radius: 5px;
    position: relative; /* Thêm thuộc tính position */
    }

    /* CSS cho chữ HOT */
    .hot-label {
    position: absolute;
    top: 10px; /* Điều chỉnh vị trí theo y */
    right: 10px; /* Điều chỉnh vị trí theo x */
    background-color: red;
    color: white;
    font-size: 16px;
    padding: 5px 10px;
    border-radius: 5px;
    z-index: 1; /* Đảm bảo hiển thị trên các phần tử khác */
    }

    </style>