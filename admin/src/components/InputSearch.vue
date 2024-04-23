<script>
export default {
    props: {
        modelValue: { type: String, default: "" },
    },
    emits: ["submit", "update:modelValue"],
    
    methods: {
        updateModelValue(e) {
            this.$emit("update:modelValue", e.target.value);
        },
        submit() {
            this.$emit("submit");
        },
    },
};
</script>

<template>
<div class="input-group">
    <input
        type="text"
        class="form-control"
        placeholder="Nhập tên sách cần tìm..."
        :value="modelValue"
        @input="updateModelValue"
        @keyup.enter="submit"
    />

    <div class="input-group-append">
        <button
            class="btn btn-outline-secondary ms-1"
            type="button"
            @click="submit"
            style="background-color:#EC6F13"
        >
            <i class="fas fa-search"></i><b> Tìm kiếm</b>
        </button>
    </div>
</div>
</template>