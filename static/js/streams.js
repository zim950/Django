const APP_ID = 'e271b13dce764083b6f9717eff2de418'
const CHANNEL = 'main'
const TOKEN = '006e271b13dce764083b6f9717eff2de418IAC35IqpRsKcI69IdzwbyCK61uhMR8vC/IVl4sWLVjFbtGTNKL8AAAAAEADJZeRXDalIYgEAAQAOqUhi'

let UID;

const client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'})

let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {
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
 
joinAndDisplayLocalStream()