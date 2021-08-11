<template>
    <table>
        <tr>
            <td>编号</td>
            <td>部门名称</td>
            <td>地址</td>
        </tr>
        <tr v-for="(item,index) in depts" :key="index">
            <td>{{item.deptno}}</td>
            <td>{{item.dname}}</td>
            <td>{{item.loc}}</td>
        </tr>
    </table>
</template>
<script>
export default {
    data(){
        return{
            depts:[]
        }
    },
    created(){
        this.$http.get('http://localhost:8081/dept/findAll').then(res => {
            this.depts = res.data
        })
    }
}
</script>