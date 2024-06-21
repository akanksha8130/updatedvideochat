const socket=io("/")
var peer=new Peer(undefined,{
    path:"/peerjs",
    host:"/",
    port:"443"
})

const user=prompt("enter your Name")
const myvideo=document.createElement("video")
myvideo.muted=true
  let myStream

  navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
  })
  .then((stream)=>{
    myStream=stream
  })

function addVideoStream(video,stream){
    video.srcObject=stream
    video.addEventListener("loaded()=>metadata",{
        video.play()
        $("#video_grid").append(video)
    })
}

$(function () {
    $("#show_chat").click(function () {
        $(".left-window").css("display", "none")
        $(".right-window").css("display", "block")
        $(".header_back").css("display", "block")
    })
    $(".header_back").click(function () {
        $(".left-window").css("display", "block")
        $(".right-window").css("display", "none")
        $(".header_back").css("display", "none")
    })


    $("#send").click(function(){
        if($("#chat_message").val().length!==0){
           socket.emit("message",$("#chat_message").val())
           $("#chat_message").val()=""
        }
    })


    $("#chat_message").keydown(function(e){
        if(e.key=="Enter" && $("#chat_message").val().length!==0){
            socket.emit("message",$("#chat_message").val())
            $("#chat_message").val()=""
        }
    })



    peer.on("open",(id)=>{
        socket.emit("join-room",ROOM_ID,id,user)
    })
    socket.on("createMessage",(message,user)=>{
        $(".messages").append(`
        <div class="message">
        <b><i class="far fa-user-circle"></i>
        <span>${user===user ? "me" : user}</span>
        
        </b>
       <span> ${message}</span>
        </div>`)
    })
})