import type { Video, Channel, VideoComment, VideoPlaylist, VideoNotification } from '@/types/video';

// URLs de vidéos gratuites (Creative Commons / libres de droits)
const videoUrls = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
];

// Chaînes vidéo
export const channels: Channel[] = [
  {
    id: 'channel-1',
    name: 'Afrobeat TV',
    description: 'La chaîne dédiée à la musique afrobeat et aux artistes africains. Découvrez les derniers clips, interviews et concerts.',
    avatarUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=200&h=200&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=1200&h=400&fit=crop',
    subscriberCount: 1250000,
    videoCount: 342,
    ownerId: 'user-channel-1',
    createdAt: new Date('2019-03-15'),
  },
  {
    id: 'channel-2',
    name: 'Makossa Classics',
    description: 'Les plus grands classiques du makossa camerounais et les nouveaux talents.',
    avatarUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1459749411177-0473ef716175?w=1200&h=400&fit=crop',
    subscriberCount: 890000,
    videoCount: 256,
    ownerId: 'user-channel-2',
    createdAt: new Date('2018-07-22'),
  },
  {
    id: 'channel-3',
    name: 'Zouk Connection',
    description: 'Le meilleur du zouk des Antilles et de l\'océan Indien.',
    avatarUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&h=400&fit=crop',
    subscriberCount: 675000,
    videoCount: 189,
    ownerId: 'user-channel-3',
    createdAt: new Date('2020-01-10'),
  },
  {
    id: 'channel-4',
    name: 'Hip Hop Africa',
    description: 'Le rap et le hip-hop africain en continu. Clips, freestyles et documentaires.',
    avatarUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=200&h=200&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3c?w=1200&h=400&fit=crop',
    subscriberCount: 2100000,
    videoCount: 567,
    ownerId: 'user-channel-4',
    createdAt: new Date('2017-11-05'),
  },
  {
    id: 'channel-5',
    name: 'Gospel Africain',
    description: 'Louange et adoration avec les plus grands artistes gospel d\'Afrique.',
    avatarUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1484876065684-b683cf17d276?w=1200&h=400&fit=crop',
    subscriberCount: 450000,
    videoCount: 123,
    ownerId: 'user-channel-5',
    createdAt: new Date('2021-05-18'),
  },
  {
    id: 'channel-6',
    name: 'Rumba Congo',
    description: 'La rumba congolaise, de ses origines à aujourd\'hui.',
    avatarUrl: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=200&h=200&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=1200&h=400&fit=crop',
    subscriberCount: 780000,
    videoCount: 234,
    ownerId: 'user-channel-6',
    createdAt: new Date('2019-09-30'),
  },
];

// Vidéos
export const videos: Video[] = [
  {
    id: 'video-1',
    title: 'Top 10 des hits Afrobeat 2024',
    description: 'Découvrez les 10 plus grands succès de l\'afrobeat cette année. Wizkid, Burna Boy, Davido et bien d\'autres !\n\n#afrobeat #wizkid #burnaboy #davido #musiqueafricaine',
    thumbnailUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=640&h=360&fit=crop',
    videoUrl: videoUrls[0],
    duration: 845,
    channelId: 'channel-1',
    channelName: 'Afrobeat TV',
    channelAvatar: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=200&h=200&fit=crop',
    views: 2450000,
    likes: 89000,
    uploadDate: new Date('2024-01-15'),
    tags: ['afrobeat', 'top 10', '2024', 'musique'],
    category: 'Musique',
  },
  {
    id: 'video-2',
    title: 'Interview exclusive avec Burna Boy',
    description: 'Burna Boy se confie sur son nouvel album, sa tournée mondiale et son amour pour l\'Afrique.\n\n#burnaboy #interview #afrobeat #nigeria',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=640&h=360&fit=crop',
    videoUrl: videoUrls[1],
    duration: 1845,
    channelId: 'channel-1',
    channelName: 'Afrobeat TV',
    channelAvatar: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=200&h=200&fit=crop',
    views: 1890000,
    likes: 125000,
    uploadDate: new Date('2024-02-20'),
    tags: ['interview', 'burnaboy', 'exclusif'],
    category: 'Interview',
  },
  {
    id: 'video-3',
    title: 'Les légendes du Makossa - Documentaire',
    description: 'Un voyage dans l\'histoire du makossa, de Manu Dibango aux artistes d\'aujourd\'hui.\n\n#makossa #cameroun #documentaire #manudibango',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=640&h=360&fit=crop',
    videoUrl: videoUrls[2],
    duration: 3240,
    channelId: 'channel-2',
    channelName: 'Makossa Classics',
    channelAvatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop',
    views: 567000,
    likes: 34000,
    uploadDate: new Date('2024-01-08'),
    tags: ['makossa', 'documentaire', 'cameroun', 'histoire'],
    category: 'Documentaire',
  },
  {
    id: 'video-4',
    title: 'Concert live - Zouk Festival 2024',
    description: 'Revivez les meilleurs moments du Zouk Festival 2024 avec Kassav\', Jocelyn Béroard et bien d\'autres !\n\n#zouk #festival #live #kassav',
    thumbnailUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=640&h=360&fit=crop',
    videoUrl: videoUrls[3],
    duration: 5420,
    channelId: 'channel-3',
    channelName: 'Zouk Connection',
    channelAvatar: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop',
    views: 890000,
    likes: 67000,
    uploadDate: new Date('2024-03-01'),
    tags: ['zouk', 'concert', 'live', 'festival'],
    category: 'Concert',
  },
  {
    id: 'video-5',
    title: 'Freestyle : Les nouveaux talents du rap africain',
    description: 'Découvrez les nouveaux visages du rap africain dans cette compilation de freestyles exclusifs.\n\n#rap #freestyle #afrique #hiphop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=640&h=360&fit=crop',
    videoUrl: videoUrls[4],
    duration: 1245,
    channelId: 'channel-4',
    channelName: 'Hip Hop Africa',
    channelAvatar: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=200&h=200&fit=crop',
    views: 1230000,
    likes: 78000,
    uploadDate: new Date('2024-02-28'),
    tags: ['rap', 'freestyle', 'hiphop', 'talents'],
    category: 'Musique',
  },
  {
    id: 'video-6',
    title: 'Louange collective - Adoration 2024',
    description: 'Un moment de louange et d\'adoration avec les plus grands noms du gospel africain.\n\n#gospel #louange #adoration #jesus',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=640&h=360&fit=crop',
    videoUrl: videoUrls[5],
    duration: 4520,
    channelId: 'channel-5',
    channelName: 'Gospel Africain',
    channelAvatar: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop',
    views: 345000,
    likes: 28000,
    uploadDate: new Date('2024-03-10'),
    tags: ['gospel', 'louange', 'adoration', 'chrétien'],
    category: 'Musique',
  },
  {
    id: 'video-7',
    title: 'Histoire de la Rumba Congolaise',
    description: 'De Franco Luambo à Fally Ipupa, retour sur l\'évolution de la rumba congolaise.\n\n#rumba #congo #franco #fallyipupa',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=640&h=360&fit=crop',
    videoUrl: videoUrls[6],
    duration: 2840,
    channelId: 'channel-6',
    channelName: 'Rumba Congo',
    channelAvatar: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=200&h=200&fit=crop',
    views: 678000,
    likes: 45000,
    uploadDate: new Date('2024-02-15'),
    tags: ['rumba', 'congo', 'histoire', 'musique'],
    category: 'Documentaire',
  },
  {
    id: 'video-8',
    title: 'Behind the Scenes - Tournée Wizkid',
    description: 'Plongez dans les coulisses de la tournée mondiale de Wizkid.\n\n#wizkid #backstage #tournée #exclusif',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=640&h=360&fit=crop',
    videoUrl: videoUrls[7],
    duration: 1845,
    channelId: 'channel-1',
    channelName: 'Afrobeat TV',
    channelAvatar: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=200&h=200&fit=crop',
    views: 1560000,
    likes: 98000,
    uploadDate: new Date('2024-03-05'),
    tags: ['wizkid', 'backstage', 'tournée', 'exclusif'],
    category: 'Behind the Scenes',
  },
  {
    id: 'video-9',
    title: 'Top Clips Makossa - Compilation',
    description: 'Les meilleurs clips vidéos du makossa dans une compilation de 2 heures.\n\n#makossa #clips #compilation #cameroun',
    thumbnailUrl: 'https://images.unsplash.com/photo-1484876065684-b683cf17d276?w=640&h=360&fit=crop',
    videoUrl: videoUrls[8],
    duration: 7240,
    channelId: 'channel-2',
    channelName: 'Makossa Classics',
    channelAvatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop',
    views: 423000,
    likes: 22000,
    uploadDate: new Date('2024-01-25'),
    tags: ['makossa', 'clips', 'compilation', 'top'],
    category: 'Musique',
  },
  {
    id: 'video-10',
    title: 'Zouk Love - Les plus belles ballades',
    description: 'Une sélection des plus belles ballades zouk pour les amoureux.\n\n#zouklove #ballades #romantique #amour',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=640&h=360&fit=crop',
    videoUrl: videoUrls[9],
    duration: 3840,
    channelId: 'channel-3',
    channelName: 'Zouk Connection',
    channelAvatar: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop',
    views: 567000,
    likes: 39000,
    uploadDate: new Date('2024-02-10'),
    tags: ['zouklove', 'romantique', 'ballades', 'amour'],
    category: 'Musique',
  },
  {
    id: 'video-11',
    title: 'Battle de rap - Nigeria vs Ghana',
    description: 'Le grand duel : les meilleurs rappeurs nigérians affrontent les ghanéens !\n\n#rap #battle #nigeria #ghana #hiphop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=640&h=360&fit=crop',
    videoUrl: videoUrls[10],
    duration: 2245,
    channelId: 'channel-4',
    channelName: 'Hip Hop Africa',
    channelAvatar: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=200&h=200&fit=crop',
    views: 2340000,
    likes: 156000,
    uploadDate: new Date('2024-03-15'),
    tags: ['rap', 'battle', 'nigeria', 'ghana'],
    category: 'Musique',
  },
  {
    id: 'video-12',
    title: 'Concert Gospel Live - Lagos 2024',
    description: 'Revivez le grand concert gospel de Lagos avec des milliers de fidèles.\n\n#gospel #concert #lagos #live',
    thumbnailUrl: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3c?w=640&h=360&fit=crop',
    videoUrl: videoUrls[11],
    duration: 5240,
    channelId: 'channel-5',
    channelName: 'Gospel Africain',
    channelAvatar: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop',
    views: 289000,
    likes: 21000,
    uploadDate: new Date('2024-03-20'),
    tags: ['gospel', 'concert', 'lagos', 'live'],
    category: 'Concert',
  },
];

// Commentaires vidéo
export const videoComments: VideoComment[] = [
  {
    id: 'comment-1',
    videoId: 'video-1',
    userId: 'user-1',
    userName: 'African Music Lover',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
    content: 'Cette compilation est incroyable ! Wizkid est vraiment le roi de l\'afrobeat 🔥',
    likes: 234,
    createdAt: new Date('2024-01-16'),
  },
  {
    id: 'comment-2',
    videoId: 'video-1',
    userId: 'user-2',
    userName: 'Naija Boy',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    content: 'Burna Boy mérite sa place en tête, son album est légendaire !',
    likes: 189,
    createdAt: new Date('2024-01-17'),
  },
  {
    id: 'comment-3',
    videoId: 'video-2',
    userId: 'user-3',
    userName: 'Music Critic',
    userAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face',
    content: 'Excellente interview, on apprend beaucoup sur sa vision de la musique.',
    likes: 456,
    createdAt: new Date('2024-02-21'),
  },
  {
    id: 'comment-4',
    videoId: 'video-3',
    userId: 'user-4',
    userName: 'Camerounaise',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    content: 'Le makossa est notre fierté ! Merci pour ce documentaire 🙏',
    likes: 312,
    createdAt: new Date('2024-01-09'),
  },
  {
    id: 'comment-5',
    videoId: 'video-4',
    userId: 'user-5',
    userName: 'Zouk Fan',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    content: 'Kassav est éternel ! Quel festival magnifique ❤️',
    likes: 278,
    createdAt: new Date('2024-03-02'),
  },
];

// Playlists vidéo
export const videoPlaylists: VideoPlaylist[] = [
  {
    id: 'vplaylist-1',
    name: 'Mes favoris',
    description: 'Mes vidéos préférées',
    userId: 'user-1',
    videos: [videos[0], videos[2], videos[4]],
    thumbnailUrl: videos[0].thumbnailUrl,
    isPublic: false,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'vplaylist-2',
    name: 'Afrobeat Hits',
    description: 'Les meilleurs hits afrobeat',
    userId: 'user-1',
    videos: [videos[0], videos[1], videos[7]],
    thumbnailUrl: videos[1].thumbnailUrl,
    isPublic: true,
    createdAt: new Date('2024-02-01'),
  },
];

// Notifications
export const videoNotifications: VideoNotification[] = [
  {
    id: 'notif-1',
    type: 'new_video',
    title: 'Nouvelle vidéo',
    message: 'Afrobeat TV a publié une nouvelle vidéo : "Top 10 des hits Afrobeat 2024"',
    channelId: 'channel-1',
    videoId: 'video-1',
    isRead: false,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'notif-2',
    type: 'new_subscriber',
    title: 'Nouvel abonné',
    message: 'Vous avez un nouvel abonné sur votre chaîne !',
    isRead: false,
    createdAt: new Date('2024-03-20'),
  },
];

// Fonction de recherche vidéo
export const searchVideos = (query: string) => {
  const lowerQuery = query.toLowerCase();
  
  return videos.filter(video => 
    video.title.toLowerCase().includes(lowerQuery) ||
    video.description.toLowerCase().includes(lowerQuery) ||
    video.channelName.toLowerCase().includes(lowerQuery) ||
    video.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

// Fonction de recherche chaîne
export const searchChannels = (query: string) => {
  const lowerQuery = query.toLowerCase();
  
  return channels.filter(channel => 
    channel.name.toLowerCase().includes(lowerQuery) ||
    channel.description.toLowerCase().includes(lowerQuery)
  );
};

// Obtenir les vidéos d'une chaîne
export const getChannelVideos = (channelId: string) => {
  return videos.filter(video => video.channelId === channelId);
};

// Obtenir les commentaires d'une vidéo
export const getVideoComments = (videoId: string) => {
  return videoComments.filter(comment => comment.videoId === videoId);
};
