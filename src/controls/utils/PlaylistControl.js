class PlaylistControl extends Control{
  playlists;
  constructor(){
    super();
    this.x = 20;
    this.y = 400
    this.playlists = [
      new Playlist("Latin Party", [
        "../../assets/playlists/latinParty/Formentera - Aitana Nicki Nicole.mp3",
        "../../assets/playlists/latinParty/Paris - Ingratax.mp3",
        "../../assets/playlists/latinParty/Te Felicito - Shakira.mp3",
      ])
    ];

    this.selector = createSelect();
    this.selector.position(this.x, this.y);
    for(let playlist of this.playlists){
      this.selector.option(playlist.name);
    }

    this.draw = function(){

    };
    this.hitCheck = function(){

    }
  }
}