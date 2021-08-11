import axios from "axios";



//获取信息
export function getInformation(){
    return axios({
        method:'get',
        url:"http://localhost:8081/dept/findAll/0/6"
    })
}
//添加信息
export function addInfor(form){
    return axios({
        method:'post',
        url:"http://localhost:8081/dept/save",
        data:form
    })

}
//更改信息
export function upData(form){
    return axios({
        method:'put',
        url:"http://localhost:8081/dept/updata",
        data:form
    })
}

//删除信息
export function deleteInfor(row){
    return axios({
        method:'delete',
        url:"http://localhost:8081/dept/delete/"+row.deptno,

    })

}