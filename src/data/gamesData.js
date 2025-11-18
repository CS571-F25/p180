// 游戏展示数据
export const gamesData = [
  {
    id: 1,
    title: "Elden Ring",
    cover: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop",
    hours: 120.5,
    achievement: 82,
    rating: 9.4,
    tags: ["RPG", "Souls-like", "Open World"],
    platform: "Steam",
    shortReview: "世界构建神级，战斗手感极佳。每一次探索都有新发现。",
    description: "《艾尔登法环》是一款由FromSoftware开发的动作角色扮演游戏。游戏拥有庞大的开放世界，充满了探索的乐趣。战斗系统保持了魂系列的高难度特色，同时加入了更多的战术选择。与乔治·R·R·马丁合作的世界观设定让游戏充满了深度。",
    fullReview: "这是我玩过最震撼的开放世界游戏之一。广阔的交界地充满了惊喜，每个角落都可能隐藏着强大的敌人或珍贵的宝物。Boss战设计精妙，需要玩家不断学习和适应。尽管难度很高，但每次战胜强敌后的成就感无与伦比。",
    screenshots: [
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=800&fit=crop"
    ],
    achievements: [
      { name: "击败玛莉卡", completed: true },
      { name: "收集所有传说武器", completed: true },
      { name: "探索所有地图", completed: false },
      { name: "完成所有NPC任务线", completed: false }
    ]
  },
  {
    id: 2,
    title: "The Witcher 3: Wild Hunt",
    cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    hours: 156.3,
    achievement: 95,
    rating: 9.8,
    tags: ["RPG", "Open World", "Story-Rich"],
    platform: "Steam",
    shortReview: "史诗级的RPG体验，每个任务都是一个精彩的故事。",
    description: "《巫师3：狂猎》是CD Projekt RED开发的角色扮演游戏杰作。游戏讲述了猎魔人杰洛特寻找养女希里的故事，拥有引人入胜的剧情和丰富的支线任务。",
    fullReview: "无可挑剔的RPG大作。主线剧情扣人心弦，支线任务质量极高，每一个都像是精心编写的短篇小说。游戏世界充满生机，NPC都有自己的故事。战斗系统流畅，炼金术和符文系统增加了战术深度。音乐和画面都是顶级水准。",
    screenshots: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop"
    ],
    achievements: [
      { name: "完成主线故事", completed: true },
      { name: "收集所有昆特牌", completed: true },
      { name: "完成所有寻宝任务", completed: true },
      { name: "获得所有结局", completed: true }
    ]
  },
  {
    id: 3,
    title: "Hollow Knight",
    cover: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&h=600&fit=crop",
    hours: 45.2,
    achievement: 76,
    rating: 9.2,
    tags: ["Metroidvania", "Indie", "Platformer"],
    platform: "Steam",
    shortReview: "精美的手绘艺术风格，充满挑战的探索体验。",
    description: "《空洞骑士》是一款2D动作冒险游戏，拥有精美的手绘风格和紧凑的战斗系统。玩家需要探索庞大的地下王国，面对各种挑战。",
    fullReview: "独立游戏中的瑰宝。手绘风格的画面美轮美奂，音乐营造出完美的氛围。地图设计精妙，探索过程充满惊喜。Boss战难度适中但需要技巧。游戏内容极其丰富，物超所值。",
    screenshots: [
      "https://images.unsplash.com/photo-1556438064-2d7646166914?w=1200&h=800&fit=crop"
    ],
    achievements: [
      { name: "击败所有Boss", completed: true },
      { name: "112%完成度", completed: false },
      { name: "完成痛苦之路", completed: false }
    ]
  },
  {
    id: 4,
    title: "Cyberpunk 2077",
    cover: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=600&fit=crop",
    hours: 89.7,
    achievement: 68,
    rating: 8.5,
    tags: ["RPG", "Cyberpunk", "FPS"],
    platform: "Steam",
    shortReview: "赛博朋克风格的夜之城令人着迷，剧情引人入胜。",
    description: "《赛博朋克2077》是一款开放世界动作冒险游戏，背景设定在未来的夜之城。玩家扮演雇佣兵V，在这个充满科技与混乱的世界中求生。",
    fullReview: "经过多次更新后，游戏体验有了显著提升。夜之城的设计令人惊叹，充满了赛博朋克美学。主线故事感人，角色塑造深刻。战斗系统多样，可以选择不同的游戏风格。虽然仍有小bug，但瑕不掩瑜。",
    screenshots: [
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1200&h=800&fit=crop"
    ],
    achievements: [
      { name: "完成主线", completed: true },
      { name: "收集所有传说装备", completed: false },
      { name: "完成所有支线", completed: false }
    ]
  },
  {
    id: 5,
    title: "Hades",
    cover: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
    hours: 67.8,
    achievement: 88,
    rating: 9.6,
    tags: ["Roguelike", "Indie", "Action"],
    platform: "Steam",
    shortReview: "完美的Roguelike游戏，每次死亡都让人想再来一局。",
    description: "《Hades》是一款以希腊神话为背景的Roguelike动作游戏。玩家扮演冥王之子扎格列欧斯，试图逃离冥界。",
    fullReview: "Roguelike游戏的标杆之作。战斗流畅爽快，武器和技能组合丰富。每次死亡都能推进剧情，这种设计巧妙地化解了Roguelike的重复感。角色对话风趣幽默，配音一流。美术风格独特，音乐令人印象深刻。",
    screenshots: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=800&fit=crop"
    ],
    achievements: [
      { name: "首次逃离", completed: true },
      { name: "使用所有武器逃离", completed: true },
      { name: "达到最高热度", completed: false }
    ]
  },
  {
    id: 6,
    title: "Stardew Valley",
    cover: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop",
    hours: 134.5,
    achievement: 72,
    rating: 9.0,
    tags: ["Farming", "Simulation", "Indie"],
    platform: "Steam",
    shortReview: "治愈系农场模拟游戏，时间杀手。",
    description: "《星露谷物语》是一款农场模拟RPG游戏。玩家继承了祖父的农场，可以种植作物、饲养动物、与村民交朋友，体验宁静的乡村生活。",
    fullReview: "极度上瘾的休闲游戏。种田、钓鱼、采矿，每项活动都设计得恰到好处。村民角色鲜活，建立关系的过程很有成就感。游戏内容丰富，可以玩上几百小时而不觉得无聊。完美的放松游戏。",
    screenshots: [
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=800&fit=crop"
    ],
    achievements: [
      { name: "完成社区中心", completed: true },
      { name: "与所有村民达到10心", completed: false },
      { name: "赚取1000万金币", completed: false }
    ]
  },
  {
    id: 7,
    title: "Sekiro: Shadows Die Twice",
    cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop",
    hours: 52.3,
    achievement: 64,
    rating: 8.8,
    tags: ["Action", "Souls-like", "Ninja"],
    platform: "Steam",
    shortReview: "极致的战斗体验，弹反系统让人欲罢不能。",
    description: "《只狼：影逝二度》是FromSoftware开发的动作冒险游戏。游戏背景设定在战国时代的日本，玩家扮演忍者保护自己的主人。",
    fullReview: "FromSoftware又一力作。战斗系统完全不同于魂系列，更注重节奏和时机。弹反系统学习曲线陡峭但掌握后非常爽快。Boss战设计精彩，剑圣一心堪称经典。难度很高，但战胜Boss的成就感无与伦比。",
    screenshots: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=800&fit=crop"
    ],
    achievements: [
      { name: "击败苇名一心", completed: true },
      { name: "获得所有结局", completed: false },
      { name: "击败所有小Boss", completed: true }
    ]
  },
  {
    id: 8,
    title: "Celeste",
    cover: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=600&fit=crop",
    hours: 28.6,
    achievement: 85,
    rating: 9.3,
    tags: ["Platformer", "Indie", "Pixel Art"],
    platform: "Steam",
    shortReview: "完美的平台跳跃游戏，讲述了一个关于克服困难的故事。",
    description: "《蔚蓝》是一款精准平台跳跃游戏。玩家帮助主角Madeline攀登Celeste山，同时探索她内心的故事。",
    fullReview: "现代平台游戏的杰作。关卡设计精妙，难度曲线完美。辅助模式让所有人都能体验完整故事，而收集品则为硬核玩家提供挑战。音乐动听，像素艺术精美。游戏关于焦虑和自我接纳的主题处理得很好。",
    screenshots: [
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&h=800&fit=crop"
    ],
    achievements: [
      { name: "完成A面", completed: true },
      { name: "完成所有B面", completed: true },
      { name: "收集所有草莓", completed: false }
    ]
  },
  {
    id: 9,
    title: "Red Dead Redemption 2",
    cover: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&h=600&fit=crop",
    hours: 98.4,
    achievement: 71,
    rating: 9.5,
    tags: ["Action", "Open World", "Western"],
    platform: "Steam",
    shortReview: "最真实的西部世界，每个细节都令人惊叹。",
    description: "《荒野大镖客：救赎2》是Rockstar Games开发的动作冒险游戏。故事发生在1899年的美国西部，玩家扮演亡命之徒Arthur Morgan。",
    fullReview: "游戏界的艺术品。画面惊艳，世界细节丰富到令人难以置信。主线故事感人至深，Arthur的人物弧光完整。游戏节奏较慢，但这正是其魅力所在。可以花几个小时只是骑马探索这个美丽的世界。",
    screenshots: [
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&h=800&fit=crop"
    ],
    achievements: [
      { name: "完成主线故事", completed: true },
      { name: "达到100%完成度", completed: false },
      { name: "收集所有传说动物", completed: false }
    ]
  },
  {
    id: 10,
    title: "Portal 2",
    cover: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&h=600&fit=crop",
    hours: 15.7,
    achievement: 92,
    rating: 9.7,
    tags: ["Puzzle", "FPS", "Sci-Fi"],
    platform: "Steam",
    shortReview: "完美的解谜游戏，幽默风趣的剧情让人印象深刻。",
    description: "《传送门2》是Valve开发的第一人称解谜游戏。玩家使用传送门枪解决各种物理谜题，在光圈科技的测试设施中冒险。",
    fullReview: "解谜游戏的巅峰之作。谜题设计巧妙，难度循序渐进。GLaDOS的毒舌和Wheatley的蠢萌让游戏充满欢乐。单人模式精彩，合作模式更是欢乐无穷。游戏时长适中，没有一处多余。",
    screenshots: [
      "https://images.unsplash.com/photo-1511882150382-421056c89033?w=1200&h=800&fit=crop"
    ],
    achievements: [
      { name: "完成单人战役", completed: true },
      { name: "完成合作模式", completed: true },
      { name: "找到所有隐藏房间", completed: true }
    ]
  },
  {
    id: 11,
    title: "Undertale",
    cover: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop",
    hours: 22.1,
    achievement: 100,
    rating: 9.4,
    tags: ["RPG", "Indie", "Bullet Hell"],
    platform: "Steam",
    shortReview: "独特的战斗系统，感人的故事，难忘的角色。",
    description: "《Undertale》是一款独立RPG游戏，玩家可以选择战斗或与怪物交朋友。游戏以其创新的战斗系统和多结局闻名。",
    fullReview: "真正的独立游戏奇迹。战斗系统创新，可以选择不杀任何敌人。角色设计可爱又深刻，每个NPC都有自己的个性。音乐令人难忘。游戏会记住玩家的选择，真正的和平路线让人流泪。",
    screenshots: [
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=1200&h=800&fit=crop"
    ],
    achievements: [
      { name: "完成和平路线", completed: true },
      { name: "完成屠杀路线", completed: true },
      { name: "找到所有隐藏内容", completed: true }
    ]
  },
  {
    id: 12,
    title: "God of War",
    cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    hours: 42.3,
    achievement: 79,
    rating: 9.1,
    tags: ["Action", "Adventure", "Mythology"],
    platform: "PS5",
    shortReview: "父子冒险故事感人至深，战斗系统精彩。",
    description: "《战神》重启了经典系列，讲述了奎托斯和儿子阿特柔斯在北欧神话世界的冒险。游戏以一镜到底的拍摄手法著称。",
    fullReview: "系列的完美重启。父子关系的刻画细腻动人，奎托斯的人物转变令人信服。战斗系统爽快，斧子的手感一流。北欧神话世界迷人，景色壮观。一镜到底的技术令人赞叹。",
    screenshots: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop"
    ],
    achievements: [
      { name: "完成主线", completed: true },
      { name: "击败所有女武神", completed: false },
      { name: "收集所有乌鸦", completed: false }
    ]
  }
];

export default gamesData;
