const addBtn=document.getElementById("addBtn")
const topicList=document.getElementById("topicList")
const topicInput=document.getElementById("topicInput")
const progress_tracker=document.getElementById("progress_tracker")
const percentage=document.getElementById("percentage")
const progress_container=document.getElementsByClassName("progress_container")
const progress_bar=document.getElementById("progress_bar")
let topics=JSON.parse(localStorage.getItem("topics")) || []
let totalTopics=0
let completedTopics=0
function updateProgress(){
    progress_tracker.textContent=`Completed: ${completedTopics}/${totalTopics}`
    percentage.textContent=`${Math.round((completedTopics/totalTopics)*100)}%`
    progress_bar.style.width=`${Math.round((completedTopics/totalTopics)*100)}%`
}
function createTopic(topicName,isCompleted){
        const newTopic=document.createElement("p")
        

        const toggleBtn=document.createElement("button")
        toggleBtn.textContent="Complete"
        if(isCompleted){
            newTopic.style.textDecoration="line-through"
            toggleBtn.textContent="Undo"
        }
        const delBtn=document.createElement("button")
        toggleBtn.className="toggleBtn"
        // toggleBtn.textContent="Complete"
        delBtn.textContent="Delete"
        delBtn.className="delBtn"


        newTopic.textContent=topicName
        newTopic.appendChild(toggleBtn)
        newTopic.appendChild(delBtn)


        toggleBtn.addEventListener("click",function(){
            if(toggleBtn.textContent==="Undo"){
                newTopic.style.textDecoration="none"
                isComplete=false
                toggleBtn.textContent="Complete"
                completedTopics--
                const topicObj=topics.find(
                    topic=>topic.name===topicName
                )
                topicObj.completed=false;
                localStorage.setItem("topics",JSON.stringify(topics))
                updateProgress()
            }else{
                newTopic.style.textDecoration="line-through"
                isComplete=true
                toggleBtn.textContent="Undo"
                completedTopics++
                const topicObj=topics.find(
                    topic=>topic.name===topicName
                )
                topicObj.completed=true;
                localStorage.setItem("topics",JSON.stringify(topics))
                updateProgress()
            }
        })
        delBtn.addEventListener("click",function(){
            if(toggleBtn.textContent==="Undo"){
                completedTopics--
            }
            totalTopics--
            topics=topics.filter(
                topic=> topic.name!==topicName
            )
            localStorage.setItem("topics",JSON.stringify(topics))
            newTopic.remove()
            updateProgress()    
        })

        
        topicList.appendChild(newTopic)
}
addBtn.addEventListener("click",function(){
    if(topicInput.value.trim()!==""){
        const topicObj={
            name:topicInput.value,
            completed:false
        }
        topics.push(topicObj)
        localStorage.setItem("topics",JSON.stringify(topics))
        createTopic(topicInput.value)
        topicInput.value=""
        totalTopics++
        updateProgress()
    }
})
for(let topic of topics){
    createTopic(topic.name,topic.completed)
}
