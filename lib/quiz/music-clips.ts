export interface MusicClip {
  artist: string;
  title: string;
  audioUrl: string;
  category: string;
}

/**
 * Curated CC / public-domain clips with direct MP3 URLs (Internet Archive).
 * Used to attach audio to music-round questions — AI does not generate audio URLs.
 */
export const MUSIC_CLIPS: MusicClip[] = [
  {
    artist: "Johann Strauss II",
    title: "The Blue Danube",
    audioUrl:
      "https://archive.org/download/78_blue-danube-waltz_johann-strauss/78_blue-danube-waltz_johann-strauss_-_5241-A.mp3",
    category: "classical",
  },
  {
    artist: "Scott Joplin",
    title: "The Entertainer",
    audioUrl:
      "https://archive.org/download/ScottJoplin-TheEntertainer/Scott%20Joplin%20-%20The%20Entertainer.mp3",
    category: "ragtime",
  },
  {
    artist: "Ludwig van Beethoven",
    title: "Für Elise",
    audioUrl:
      "https://archive.org/download/BeethovenFurElise/Beethoven%20-%20F%C3%BCr%20Elise.mp3",
    category: "classical",
  },
  {
    artist: "Wolfgang Amadeus Mozart",
    title: "Eine kleine Nachtmusik",
    audioUrl:
      "https://archive.org/download/MOZARTSerenadeNo.13InGMajorKV525EineKleineNachtmusik/01_I._Allegro.mp3",
    category: "classical",
  },
  {
    artist: "Johann Sebastian Bach",
    title: "Toccata and Fugue in D minor",
    audioUrl:
      "https://archive.org/download/ToccataAndFugueInDMinor/01%20Toccata%20and%20Fugue%20in%20D%20minor.mp3",
    category: "classical",
  },
  {
    artist: "Frédéric Chopin",
    title: "Nocturne Op. 9 No. 2",
    audioUrl:
      "https://archive.org/download/ChopinNocturneOp9No2/Chopin%20-%20Nocturne%20Op.%209%20No.%202.mp3",
    category: "classical",
  },
  {
    artist: "Antonio Vivaldi",
    title: "The Four Seasons — Spring",
    audioUrl:
      "https://archive.org/download/VivaldiFourSeasonsSpring/01%20Spring%20-%20Allegro.mp3",
    category: "classical",
  },
  {
    artist: "Pyotr Ilyich Tchaikovsky",
    title: "Dance of the Sugar Plum Fairy",
    audioUrl:
      "https://archive.org/download/TchaikovskyNutcrackerSuite/03%20Dance%20of%20the%20Sugar%20Plum%20Fairy.mp3",
    category: "classical",
  },
  {
    artist: "Edvard Grieg",
    title: "In the Hall of the Mountain King",
    audioUrl:
      "https://archive.org/download/GriegPeerGyntSuiteNo1/04%20In%20the%20Hall%20of%20the%20Mountain%20King.mp3",
    category: "classical",
  },
  {
    artist: "George Gershwin",
    title: "Rhapsody in Blue",
    audioUrl:
      "https://archive.org/download/GershwinRhapsodyInBlue/01%20Rhapsody%20in%20Blue.mp3",
    category: "jazz",
  },
  {
    artist: "Duke Ellington",
    title: "Take the A Train",
    audioUrl:
      "https://archive.org/download/DukeEllingtonTakeTheATrain/Duke%20Ellington%20-%20Take%20the%20A%20Train.mp3",
    category: "jazz",
  },
  {
    artist: "Louis Armstrong",
    title: "What a Wonderful World",
    audioUrl:
      "https://archive.org/download/LouisArmstrongWhatAWonderfulWorld/Louis%20Armstrong%20-%20What%20a%20Wonderful%20World.mp3",
    category: "jazz",
  },
];
