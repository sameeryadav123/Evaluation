
let container=document.querySelector("#container")
let gender=document.querySelector("#gender")
let department=document.querySelector("#department")
let order=document.querySelector("#order")

let getData=async(url)=>{

    try {
        let res= await fetch('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10')
        let data= await res.json()
        // let rusult=data.data
        showData(data.data)
    } catch (error) {
        console.log("Message unable fo fetch ",error)
    }
}

getData()

let showData=(data)=>{

    data.forEach((ele,i)=>{

        

        let srNo=document.createElement("tr")
        srNo.textContent=ele.id

        let name=document.createElement("tr")
       
        name.textContent=ele.name

        let gender=document.createElement('tr')
        gender.textContent=ele.gender

        let department=document.createElement('tr')
        department.textContent=ele.department

        let salary=document.createElement('tr')
        salary.textContent=ele.salary


        let previous=document.createElement("button")
        previous.textContent="Previous"

        let next=document.createElement("button")
        next.textContent="Next"
        container.append(srNo,name,gender,department,salary)
        

    })
}

let findingDeperatment=async()=>{
    let findValue=department.value

    if(findValue !== ""){
        let url=`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees/department/${findValue}`
        await getData(url)
       
    }else{
        console.log("Please select the Department")
    }
}
department.addEventListener("change",findingDeperatment)


let findingGender=async()=>{
    try {
        let findGender=gender.value
    if(findGender !== ""){
        let url=`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees/gender/${findGender}`
    await getData(url)
    }
    } catch (error) {
        console.log("Please Read this Error",error)
    }
    
}

gender.addEventListener("change",findingGender)




let salaryOrder=async()=>{
    try {

           
           let url='https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees'
        let res= await fetch(url)
        let data= await res.json()

        let priceOrder=order.value
        if(priceOrder == "low"){
            data.sort((a,b)=> a.order -b.order)
        }else if(priceOrder == "high"){
            data.sort((a,b)=> b.order -a.order)
        }
      await  showData(data)
    } catch (error) {
        console.log({"message":error})
    }
}

order.addEventListener("change",salaryOrder)





