const topicInput=document.getElementById("topicInput")
const topicList=document.getElementById("topicList")
const addBtn=document.getElementById("addBtn")
const completed=document.getElementById("completed")
const percentage=document.getElementById("percentage")
const progress_bar_container=document.getElementById("progress_bar_container")
const progress_bar=document.getElementById("progress_bar")
const searchInput=document.getElementById("searchInput")
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
    completed.textContent=`${completedTopics} of ${totalTopics} topics completed`
    percentage.textContent=`Percentage: ${Math.round((completedTopics/totalTopics)*100)} %`
    progress_bar.style.width=`${Math.round((completedTopics/totalTopics)*100)}%`
}
function createTopic(newTopic,isCompleted){
    totalTopics++
    
    const topicCard=document.createElement("div")
    topicCard.className="newPara"

    const topicName=document.createElement("span")
    topicName.className="newTopic";
    topicName.textContent=newTopic;

    const delBtn=document.createElement("button")
    delBtn.textContent="Delete"
    delBtn.className="delBtn"
     const toggleBtn=document.createElement("button")
    toggleBtn.className="toggleBtn"
    toggleBtn.textContent="Complete"

    const buttonContainer=document.createElement("div")
    buttonContainer.className="buttonContainer"

    buttonContainer.appendChild(delBtn)
    buttonContainer.appendChild(toggleBtn)

    topicCard.appendChild(topicName)
    topicCard.appendChild(buttonContainer)
    topicList.appendChild(topicCard)

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
        topicCard.remove()
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
searchInput.addEventListener("input",function(){
    const searchText=searchInput.value.toLowerCase()
    const allTopics=document.querySelectorAll("#topicList .newPara")
    for(let topic of allTopics){
        const newTopic=topic.querySelector(".newTopic").textContent.toLowerCase();
        if(newTopic.includes(searchText)){
            topic.style.display=""
        }
        else{
            topic.style.display="none"
        }
    }

})
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