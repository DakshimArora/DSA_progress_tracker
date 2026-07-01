//progress bar, local storage



const topicInput=document.getElementById("topicInput")
const topicList=document.getElementById("topicList")
const addBtn=document.getElementById("addBtn")
const completed=document.getElementById("completed")
const percentage=document.getElementById("percentage")
const progress_bar_container=document.getElementById("progress_bar_container")
const progress_bar=document.getElementById("progress_bar")
let totalTopics=0
let completedTopics=0
let topics=JSON.parse(localStorage.getItem("topics")) || []

function updateProgress(){
    if(totalTopics===0){
        completed.textContent="Completed: 0/0"
        percentage.textContent="Percentage: 0%"
        progress_bar.style.width="0%"
        return
    }
    completed.textContent=`Completed: ${completedTopics}/${totalTopics}`
    percentage.textContent=`Percentage: ${Math.round((completedTopics/totalTopics)*100)} %`
    progress_bar.style.width=`${Math.round((completedTopics/totalTopics)*100)}%`
}
function createTopic(newTopic,isCompleted){
    totalTopics++
    
    const topicName=document.createElement("p")
    topicName.textContent=newTopic;

    const delBtn=document.createElement("button")
    delBtn.textContent="Delete"
    topicName.appendChild(delBtn)
    delBtn.className="delBtn"

    const toggleBtn=document.createElement("button")
    toggleBtn.className="toggleBtn"
    toggleBtn.textContent="Complete"
    topicName.appendChild(toggleBtn)

    topicList.appendChild(topicName)
    if(isCompleted){
        topicName.style.textDecoration="line-through"
        toggleBtn.textContent="Undo"
        completedTopics++ 
        // completedTopics++
    }
    updateProgress()

    delBtn.addEventListener("click",function(){
        
        if(toggleBtn.textContent==="Undo"){
            completedTopics--   
        }
        topics=topics.filter(
            topic=> topic.name!==newTopic
        )
        localStorage.setItem("topics",JSON.stringify(topics))
        topicName.remove()
        totalTopics--
        updateProgress()
    })

    toggleBtn.addEventListener("click",function(){
        if(toggleBtn.textContent==="Complete"){
            topicName.style.textDecoration="line-through"
            toggleBtn.textContent="Undo"
            isCompleted=true
            // topics=topics.filter(
            //     topic=>topic.completed=!(topic.completed)
            // )
            const topicObj=topics.find(
                topic=>topic.name===newTopic
            )
            topicObj.completed=true
            localStorage.setItem("topics",JSON.stringify(topics))
            completedTopics++
        }
        else{
            topicName.style.textDecoration="none"
            toggleBtn.textContent="Complete"
            isCompleted=false
            const topicObj=topics.find(
                topic=>topic.name===newTopic
            )
            topicObj.completed=false
            localStorage.setItem("topics",JSON.stringify(topics))
            completedTopics--
        }
        updateProgress()
    })
}
addBtn.addEventListener("click",function(){
    if(topicInput.value.trim()!==""){
        // totalTopics++
        const topicObj={
            name:topicInput.value,
            completed:false
        }
        topics.push(topicObj)
        localStorage.setItem("topics",JSON.stringify(topics))
        createTopic(topicInput.value)

        topicInput.value=""

    }
})
for(let topic of topics){
    createTopic(topic.name,topic.completed)
}