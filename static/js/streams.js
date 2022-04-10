const APP_ID = 'e271b13dce764083b6f9717eff2de418'
const CHANNEL = 'main'
const TOKEN = '006e271b13dce764083b6f9717eff2de418IADADSM43/StAMPgtsS2lUEIolvvGmNSy9gHeqEQjHczdmTNKL8AAAAAEAAFO07njU1UYgEAAQCNTVRi'

let UID;
const client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'})

let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {
    
  client.on('user-published', handleUserJoined)
    UID = await client.join(APP_ID,CHANNEL,TOKEN, null)

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    let player = `<div class="video-container" id="user-container-${UID}">
                  <div class="username-wrapper"><span class="user-name">MD ZIM</span></div>
                  <div class="video-player" id="user-${UID}"></div> 
                    
                </div>`
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)          
    
    localTracks[1].play(`user-${UID}`)

    await client.publish(localTracks[0], localTracks[1])
}

let handleUserJoined = async (user, mediaType) => {
  remoteUsers[user.uid] = user
  await client.subscribe(user, mediaType)

  if (mediaType === 'video'){
      let player = document.getElementById(`user-container-${user.uid}`)
      if (player != null){
          player.remove()
      }

      let member = await getMember(user)

      player = `<div  class="video-container" id="user-container-${user.uid}">
          <div class="video-player" id="user-${user.uid}"></div>
          <div class="username-wrapper"><span class="user-name">${member.name}</span></div>
      </div>`

      document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)
      user.videoTrack.play(`user-${user.uid}`)
  }

  if (mediaType === 'audio'){
      user.audioTrack.play()
  }


}
joinAndDisplayLocalStream()