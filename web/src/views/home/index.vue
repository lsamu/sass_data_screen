<template>
    <div class="box-editor-chart">
        <el-row :gutter="10">
            <el-col>
                <el-form :inline="true" :model="searchOption.form">
                    <el-form-item label="关键词">
                        <el-input v-model="searchOption.form.title" placeholder="请输入关键词" clearable />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleSearch">搜索</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="4">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                    <div class="add-card" @click="handleNew">

                        <el-icon :size="100">
                            <Plus></Plus>
                        </el-icon>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="4" v-for="(item, index) in thatOption.data" :key="index">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                    <div class="item-image">
                        <img class="image" :src="getImage(item.img)" alt="" />
                    </div>

                    <div style="padding: 14px">
                        <span>{{ item.title }}</span>
                        <span style="float: right;">
                            <el-dropdown trigger="click">
                                <span class="el-dropdown-link">
                                    <el-icon :size="15">
                                        <More />
                                    </el-icon>
                                </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item @click.native="handleEdit(item.id)">编辑</el-dropdown-item>
                                        <el-dropdown-item @click.native="handleVisual(item.id)">设计</el-dropdown-item>
                                        <el-dropdown-item @click.native="handleCopy(item)">复制</el-dropdown-item>
                                        <el-dropdown-item @click.native="handleDelete(item.id)">删除</el-dropdown-item>
                                        <el-dropdown-item @click.native="handleView(item.id)">访问</el-dropdown-item>
                                        <!-- <el-dropdown-item @click.native="handleView(item.id)">二维码</el-dropdown-item> -->
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :span="10">
            <el-col>
                <div style="float: right;">
                    <el-pagination background layout="prev, pager, next, jumper" :total="1000" />
                </div>

            </el-col>
        </el-row>

        <el-dialog v-model="formOption.dialog.visible" title="编辑" width="50%" draggable="true">

            <el-form :model="formOption.form" label-width="120px">
                <el-form-item label="名称：">
                    <el-input v-model="formOption.form.title" />
                </el-form-item>
                <el-form-item label="密码：">
                    <el-input type="password" v-model="formOption.form.password" />
                </el-form-item>
                <el-form-item label="说明：">
                    <el-input type="textarea" v-model="formOption.form.desc" />
                </el-form-item>
            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button icon="Close" @click="formOption.dialog.visible = false">取消</el-button>
                    <el-button type="primary" icon="Check" @click="handleSubmit">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>
<script lang="ts" setup>
import { Calendar, Search, Edit, SetUp, DocumentCopy, More, Delete, Plus } from '@element-plus/icons-vue'


const root = getCurrentInstance();
const that = root.proxy;
const router = that.$router
const route = that.$route

const thatOption = reactive({
    data: [{
        id: "123",
        title: "我的低代码"
    }] as any
});

const handleEdit = function (id: number) {
    formOption.dialog.visible = true
};

const handleVisual = function (id: number) {
    const routeUrl = router.resolve({
        path: `/editor/${id}`
    })
    window.open(routeUrl.href, '_blank');
};

const handleNew = function () {
    formOption.dialog.visible = true
};

const handleCopy = function (row: any) { };

const handleDelete = function (row: any) { };

const handleView = function (id: number) {
    const routeUrl = router.resolve({
        path: `/view/${id}`
    })
    window.open(routeUrl.href, '_blank');
};

const getImage = function (src: string) {
    if (src == null || src == "" || src == "#") {
        return new URL("/src/assets/logo.png",import.meta.url);
    }
    return src;
};


const formOption = reactive({
    dialog: {
        visible: false
    },
    form: {} as any
})

const handleSubmit = () => {
    thatOption.data.push({
        ...formOption.form
    })

    formOption.dialog.visible = false
}

const searchOption = reactive({
    form:{} as any
})

const handleSearch = ()=>{

}

</script>
  
<style lang="scss" scoped>
.box-editor-chart {
    padding: 10px;

    .el-card {
        margin-bottom: 10px;

        .item-image {
            width: 100%;
            height: 218px;
        }

        .image {
            width: 100%;
            height: 100%;
            object-fit: contain;
            // width: 100%;
            // height: 150px;
            display: block;
            opacity: 0.6;
            transition: opacity 0.3s ease;
        }

        &:hover {
            cursor: pointer;

            .image {
                opacity: 0.8;
            }
        }
    }

    .el-card .add-card {
        height: 268px;
        line-height: 268px;
        text-align: center;
        font-size: 82px;
        color: rgba(0, 0, 0, 0.08);
    }
}

.context-menu {
    float: right;
}
</style>