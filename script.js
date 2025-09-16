// 开场剧情数据
const storyLines = [
    "大家好，今天咱们来讲一个关于'锔瓷'技艺跨越百年的故事——它不只修补瓷器，更修复的是文化、记忆和民族的魂。",
    "故事开始于国家博物馆，一尊明代的青花瓶静静立在展柜中，上面有七道金线和锔钉缀成的北斗七星——而这每道痕迹，背后都藏着一段历史。",
    "时间回到1928年，北平琉璃厂。少年学徒林怀瑾一不小心，打碎了店里要鉴赏的贡瓶，急得不知如何是好。",
    "这时，一位老匠人郭守愚现身了，他说：'瓷虽碎了，但魂不能散。'他拿出金刚钻，开始修补——",
    "七天七夜，锔钉像星星一样落在瓷片上，最后一道裂痕被补上。临走前，老人留下一句话：'万物皆有裂缝，那是光照进来的地方。'",
    "转眼到了1937年，卢沟桥事变爆发，战火波及琉璃厂。这时林怀瑾已是掌柜，他把锔瓷藏品紧急藏进地窖。",
    "日军来搜查，为掩护暗格中的锔瓶，林怀瑾的妻子毅然推倒博古架——瓷器碎声响彻店里，日军大笑离去。",
    "林怀瑾一边颤抖着捡碎片，一边把妻子的银簪熔成锔钉，修补这只瓶。当最后一颗锔钉落下——城外传来平型关大捷的消息。",
    "时间跳到1972年，林家第三代传人林望舒在干校牛棚里，偷偷跟着八十岁的郭智军学习锔瓷。",
    "老人用草秆代替锔钉教他，说：'锔瓷有三重境界——修形、续韵、铸魂。而现在我们要修补的，是文明的断层。'",
    "返城前夜，老人把祖传的金刚钻埋进黄土，说：'等山河重光了，让它再见天日。'",
    "来到2013年，海外拍卖会上出现一件所谓'战争遗珍'锔瓷瓶，日本藏家声称是他们的收藏。",
    "这时，林家第四代——留学归来的李欢带着证据来了：老照片、银簪鉴定报告，还有她父亲凭记忆绘制的锔钉图谱。",
    "当图谱投影与故宫星空完美重合的那一刻，全场肃然起敬——锔瓷的身世，不言自明。",
    "最后来到2023年，在太行山的非遗研学营里，李欢把金刚钻交到年轻人手中。",
    "她说：'我的老师说过——每一代人都要修补时代的裂缝。如今要锔合的不再是瓷器，是千年不断的文脉。'",
    "镜头扫过今天的中国：锔瓷灯饰点亮古城，航天材料融合传统工艺，中国修复标准走向世界……",
    "而那尊锔瓶始终静立博物馆中，锔钉如星河闪烁，仿佛在说：",
    "'破碎不是结束，而是新生的开始——这是我们民族在裂痕中坚守、在破碎中重圆的智慧。'",
    "这，就是锔瓷告诉世界的答案。"
];

let currentStoryIndex = 0;

// 开场剧情控制
function initStoryIntro() {
    currentStoryIndex = 0;
    updateStoryText();
}

function nextStoryLine() {
    if (currentStoryIndex < storyLines.length - 1) {
        currentStoryIndex++;
        updateStoryText();
    } else {
        // 剧情结束，进入主菜单
        showMainMenu();
    }
}

function showMainMenu() {
    // 隐藏开场剧情
    document.getElementById('story-intro').classList.remove('active');
    // 显示主菜单
    document.getElementById('main-menu').classList.add('active');
}

function updateStoryText() {
    const storyText = document.getElementById('story-text');
    if (storyText) {
        // 添加淡出效果
        storyText.style.opacity = '0';
        
        setTimeout(() => {
            storyText.textContent = storyLines[currentStoryIndex];
            storyText.style.opacity = '1';
        }, 300);
    }
}

function showMainMenu() {
    document.getElementById('story-intro').classList.remove('active');
    document.getElementById('main-menu').classList.add('active');
}

// 游戏状态管理
class GameState {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 8;
        this.stepProgress = {};
        this.sounds = {};
        this.soundEnabled = true;
        this.audioContext = null;
        this.backgroundMusic = null;
        this.musicEnabled = true;
        this.musicVolume = 0.4;
        this.init();
        this.initAudio();
        this.initBackgroundMusic();
    }

    init() {
        this.setupEventListeners();
        this.updateProgress();
        // 初始化开场剧情而不是直接进入第一步
        this.initStoryIntro();
    }

    initStoryIntro() {
        initStoryIntro();
    }

    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.generateSounds();
        } catch (e) {
            console.log('音频初始化失败:', e);
            this.soundEnabled = false;
        }
    }

    initBackgroundMusic() {
        // 创建背景音乐音频元素
        this.backgroundMusic = new Audio();
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = this.musicVolume;
        this.backgroundMusic.preload = 'auto';
        
        // 创建一个简单的背景音乐（使用Web Audio API生成）
        this.createBackgroundMusicTrack();
        
        // 监听音频事件
        this.backgroundMusic.addEventListener('canplaythrough', () => {
            console.log('背景音乐加载完成');
        });
        
        this.backgroundMusic.addEventListener('error', (e) => {
            console.log('背景音乐加载失败:', e);
        });
        
        this.backgroundMusic.addEventListener('loadeddata', () => {
            console.log('音频数据加载完成');
        });
    }

    createBackgroundMusicTrack() {
        // 使用《云海林飞》作为背景音乐
        // 首先尝试加载音乐文件，如果失败则使用生成的音乐
        this.backgroundMusic.src = 'music/云海林飞 - 纯音乐网.mp3';
        
        // 如果音乐文件加载失败，回退到生成的音乐
        this.backgroundMusic.addEventListener('error', () => {
            console.log('音乐文件加载失败，使用生成的背景音乐');
            this.generateBackgroundMusicDataURL();
        });
        
        this.backgroundMusic.addEventListener('canplaythrough', () => {
            console.log('《云海林飞》音乐加载成功');
        });
    }

    generateBackgroundMusicDataURL() {
        if (!this.audioContext) return;
        
        try {
            // 创建适合陶瓷修复主题的舒缓音乐
            const duration = 45; // 45秒循环，更长的循环避免重复感
            const sampleRate = this.audioContext.sampleRate;
            const length = duration * sampleRate;
            const buffer = this.audioContext.createBuffer(2, length, sampleRate);
            
            // 生成中国风格的五声音阶背景音乐
            for (let channel = 0; channel < 2; channel++) {
                const channelData = buffer.getChannelData(channel);
                for (let i = 0; i < length; i++) {
                    const time = i / sampleRate;
                    
                    // 创建宁静的中国风音乐，适合专注的手工艺活动
                    let sample = 0;
                    
                    // 使用五声音阶 (宫商角徵羽)
                    const pentatonicScale = [
                        174.61, // F3 (宫)
                        196.00, // G3 (商) 
                        220.00, // A3 (角)
                        261.63, // C4 (徵)
                        293.66  // D4 (羽)
                    ];
                    
                    // 主旋律 - 缓慢变化的音符
                    const noteIndex = Math.floor(time / 3) % pentatonicScale.length;
                    const frequency = pentatonicScale[noteIndex];
                    
                    // 主音 - 使用正弦波模拟古筝或古琴的音色
                    sample += Math.sin(2 * Math.PI * frequency * time) * 0.15;
                    
                    // 和声 - 五度和声
                    const harmonyFreq = frequency * 1.5; // 完全五度
                    sample += Math.sin(2 * Math.PI * harmonyFreq * time) * 0.08;
                    
                    // 低音 - 提供稳定的基础
                    const bassFreq = frequency * 0.5;
                    sample += Math.sin(2 * Math.PI * bassFreq * time) * 0.12;
                    
                    // 添加轻微的颤音效果，模拟传统乐器
                    const vibrato = 1 + 0.02 * Math.sin(2 * Math.PI * 4 * time);
                    sample *= vibrato;
                    
                    // 添加自然的音量包络，创造呼吸感
                    const breathEnvelope = 0.7 + 0.3 * Math.sin(2 * Math.PI * time / 8);
                    
                    // 整体音量包络，避免突然开始和结束
                    let envelope = 1;
                    if (time < 2) {
                        envelope = time / 2; // 淡入
                    } else if (time > duration - 2) {
                        envelope = (duration - time) / 2; // 淡出
                    }
                    
                    sample *= envelope * breathEnvelope * 0.25; // 降低整体音量
                    
                    // 添加轻微的混响效果
                    if (i > sampleRate * 0.1) {
                        const delayedSample = channelData[i - Math.floor(sampleRate * 0.1)] || 0;
                        sample += delayedSample * 0.15;
                    }
                    
                    channelData[i] = Math.max(-1, Math.min(1, sample));
                }
            }
            
            // 将buffer转换为WAV格式的DataURL
            const wavData = this.bufferToWav(buffer);
            const blob = new Blob([wavData], { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);
            this.backgroundMusic.src = url;
            
        } catch (e) {
            console.log('生成背景音乐失败:', e);
        }
    }

    bufferToWav(buffer) {
        const length = buffer.length;
        const numberOfChannels = buffer.numberOfChannels;
        const sampleRate = buffer.sampleRate;
        const arrayBuffer = new ArrayBuffer(44 + length * numberOfChannels * 2);
        const view = new DataView(arrayBuffer);
        
        // WAV文件头
        const writeString = (offset, string) => {
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        };
        
        writeString(0, 'RIFF');
        view.setUint32(4, 36 + length * numberOfChannels * 2, true);
        writeString(8, 'WAVE');
        writeString(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, numberOfChannels, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * numberOfChannels * 2, true);
        view.setUint16(32, numberOfChannels * 2, true);
        view.setUint16(34, 16, true);
        writeString(36, 'data');
        view.setUint32(40, length * numberOfChannels * 2, true);
        
        // 写入音频数据
        let offset = 44;
        for (let i = 0; i < length; i++) {
            for (let channel = 0; channel < numberOfChannels; channel++) {
                const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
                view.setInt16(offset, sample * 0x7FFF, true);
                offset += 2;
            }
        }
        
        return arrayBuffer;
    }

    playBackgroundMusic() {
        if (this.musicEnabled && this.backgroundMusic) {
            const playPromise = this.backgroundMusic.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('背景音乐开始播放');
                }).catch(e => {
                    console.log('背景音乐播放失败:', e);
                });
            }
        }
    }

    pauseBackgroundMusic() {
        if (this.backgroundMusic && !this.backgroundMusic.paused) {
            this.backgroundMusic.pause();
            console.log('背景音乐已暂停');
        }
    }

    toggleBackgroundMusic() {
        if (this.musicEnabled) {
            this.playBackgroundMusic();
        } else {
            this.pauseBackgroundMusic();
        }
    }

    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        if (this.backgroundMusic) {
            this.backgroundMusic.volume = this.musicVolume;
        }
    }

    generateSounds() {
        // 生成各种音效
        this.sounds = {
            click: this.createClickSound(),
            unlock: this.createUnlockSound(),
            brush: this.createBrushSound(),
            drill: this.createDrillSound(),
            hammer: this.createHammerSound()
        };
    }

    createClickSound() {
        return () => {
            if (!this.audioContext) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.1);
        };
    }

    createUnlockSound() {
        return () => {
            if (!this.audioContext) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(800, this.audioContext.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.2);
        };
    }

    createBrushSound() {
        return () => {
            if (!this.audioContext) return;
            
            const bufferSize = this.audioContext.sampleRate * 0.3;
            const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
            const output = buffer.getChannelData(0);
            
            for (let i = 0; i < bufferSize; i++) {
                output[i] = (Math.random() * 2 - 1) * 0.1 * Math.exp(-i / bufferSize * 5);
            }
            
            const bufferSource = this.audioContext.createBufferSource();
            const gainNode = this.audioContext.createGain();
            
            bufferSource.buffer = buffer;
            bufferSource.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            
            bufferSource.start(this.audioContext.currentTime);
        };
    }

    createDrillSound() {
        return () => {
            if (!this.audioContext) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(300, this.audioContext.currentTime + 0.1);
            oscillator.frequency.linearRampToValueAtTime(200, this.audioContext.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.2);
        };
    }

    createHammerSound() {
        return () => {
            if (!this.audioContext) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(150, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.4, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.1);
        };
    }

    playSound(soundName) {
        if (this.soundEnabled && this.sounds[soundName]) {
            try {
                this.sounds[soundName]();
            } catch (e) {
                console.log('音效播放失败:', e);
            }
        }
    }

    setupEventListeners() {
        // 设置各种事件监听器
        document.addEventListener('click', () => {
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            
            // 首次用户交互时开始播放背景音乐
            if (this.musicEnabled && this.backgroundMusic && this.backgroundMusic.paused) {
                this.playBackgroundMusic();
            }
        });
    }

    updateProgress() {
        const progress = (this.currentStep / this.totalSteps) * 100;
        const progressFill = document.getElementById('progress');
        const progressText = document.getElementById('progress-text');
        
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
        
        if (progressText) {
            progressText.textContent = `${this.currentStep}/${this.totalSteps}`;
        }
    }

    updateStepTitle() {
        const stepTitles = [
            '第一步：捧匣与启封',
            '第二步：洗净与归位',
            '第三步：找碴与定点',
            '第四步：牵钻与引孔',
            '第五步：锻钉与塑形',
            '第六步：落锤与扣合',
            '第七步：调浆与弥缝',
            '第八步：拂尘与归还'
        ];
        
        const stepTitle = document.getElementById('step-title');
        if (stepTitle && stepTitles[this.currentStep - 1]) {
            stepTitle.textContent = stepTitles[this.currentStep - 1];
        }
    }

    showStep(stepNumber) {
        // 隐藏所有步骤
        document.querySelectorAll('.step-screen').forEach(step => {
            step.classList.remove('active');
        });
        
        // 显示指定步骤
        const targetStep = document.getElementById(`step${stepNumber}`);
        if (targetStep) {
            targetStep.classList.add('active');
            
            // 显示介绍页面，隐藏游戏内容
            const intro = targetStep.querySelector('.step-intro');
            const content = targetStep.querySelector('.step-content');
            if (intro && content) {
                intro.classList.add('active');
                content.classList.add('hidden');
                
                // 强制加载和播放视频
                const video = intro.querySelector('.intro-video');
                if (video) {
                    console.log('找到视频元素:', video);
                    console.log('视频源:', video.src);
                    console.log('视频就绪状态:', video.readyState);
                    
                    video.load();
                    video.currentTime = 0;
                    
                    // 添加事件监听器
                    video.addEventListener('loadstart', () => console.log('视频开始加载'));
                    video.addEventListener('canplay', () => console.log('视频可以播放'));
                    video.addEventListener('playing', () => console.log('视频正在播放'));
                    video.addEventListener('error', (e) => console.log('视频错误:', e));
                    
                    video.play().then(() => {
                        console.log('视频播放成功');
                    }).catch(e => {
                        console.log('视频自动播放被阻止:', e);
                        // 如果自动播放被阻止，显示一个点击播放的按钮
                        const playBtn = document.createElement('button');
                        playBtn.textContent = '点击播放背景视频';
                        playBtn.style.position = 'absolute';
                        playBtn.style.top = '10px';
                        playBtn.style.right = '10px';
                        playBtn.style.zIndex = '999';
                        playBtn.onclick = () => {
                            video.play();
                            playBtn.remove();
                        };
                        intro.appendChild(playBtn);
                    });
                }
            }
        }
        
        this.currentStep = stepNumber;
        this.updateProgress();
        this.updateStepTitle();
        
        // 更新控制按钮状态
        this.updateControlButtons();
    }

    updateControlButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const completeBtn = document.getElementById('complete-btn');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentStep <= 1;
        }
        
        if (nextBtn) {
            nextBtn.style.display = this.currentStep >= this.totalSteps ? 'none' : 'inline-block';
        }
        
        if (completeBtn) {
            completeBtn.style.display = 'none';
        }
    }

    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.showStep(this.currentStep + 1);
        } else {
            // 显示最终展示
            showFinalPresentation();
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            // 返回到上一步的介绍页面
            const prevStepNumber = this.currentStep - 1;
            this.showStep(prevStepNumber);
        }
    }

    initStep1() {
        // 初始化第一步
        const woodenBox = document.getElementById('wooden-box');
        const boxLock = document.getElementById('box-lock');
        
        if (woodenBox && boxLock) {
            boxLock.addEventListener('click', (e) => {
                e.stopPropagation();
                this.playSound('unlock');
                
                // 开锁动画
                boxLock.style.transform = 'translate(-50%, -50%) rotate(90deg)';
                boxLock.style.opacity = '0';
                
                setTimeout(() => {
                    boxLock.style.display = 'none';
                    const boxContent = document.getElementById('box-content');
                    if (boxContent) {
                        boxContent.classList.remove('hidden');
                        boxContent.style.animation = 'slideIn 0.5s ease-out';
                    }
                }, 300);
            });
        }
    }
}

// 步骤启动函数
function startStep1() {
    const intro = document.getElementById('step1-intro');
    const content = document.getElementById('step1-content');
    
    if (intro && content) {
        intro.classList.remove('active');
        content.classList.remove('hidden');
        
        // 初始化第一步的交互
        if (gameState && gameState.initStep1) {
            gameState.initStep1();
        }
    }
    
    gameState.playSound('click');
}

function startStep2() {
    const intro = document.getElementById('step2-intro');
    const content = document.getElementById('step2-content');
    
    if (intro && content) {
        intro.classList.remove('active');
        content.classList.remove('hidden');
        initCleaningStep();
    }
    
    gameState.playSound('click');
}

function startStep3() {
    const intro = document.getElementById('step3-intro');
    const content = document.getElementById('step3-content');
    
    if (intro && content) {
        intro.classList.remove('active');
        content.classList.remove('hidden');
        initMarkingStep();
    }
    
    gameState.playSound('click');
}

function startStep4() {
    const intro = document.getElementById('step4-intro');
    const content = document.getElementById('step4-content');
    
    if (intro && content) {
        intro.classList.remove('active');
        content.classList.remove('hidden');
        initDrillingStep();
    }
    
    gameState.playSound('click');
}

function startStep5() {
    const intro = document.getElementById('step5-intro');
    const content = document.getElementById('step5-content');
    
    if (intro && content) {
        intro.classList.remove('active');
        content.classList.remove('hidden');
        initForgingStep();
    }
    
    gameState.playSound('click');
}

function startStep6() {
    const intro = document.getElementById('step6-intro');
    const content = document.getElementById('step6-content');
    
    if (intro && content) {
        intro.classList.remove('active');
        content.classList.remove('hidden');
        initInstallationStep();
    }
    
    gameState.playSound('click');
}

function startStep7() {
    const intro = document.getElementById('step7-intro');
    const content = document.getElementById('step7-content');
    
    if (intro && content) {
        intro.classList.remove('active');
        content.classList.remove('hidden');
        initKintsugiStep();
    }
    
    gameState.playSound('click');
}

function startStep8() {
    const intro = document.getElementById('step8-intro');
    const content = document.getElementById('step8-content');
    
    if (intro && content) {
        intro.classList.remove('active');
        content.classList.remove('hidden');
        initFinishingStep();
    }
    
    gameState.playSound('click');
}

// 各步骤的具体初始化函数
function initCleaningStep() {
    // 初始化清洗步骤
    const piecesContainer = document.getElementById('pieces-container');
    const assemblyArea = document.getElementById('assembly-area');
    const toolBtns = document.querySelectorAll('.tool-btn');
    
    if (piecesContainer && assemblyArea) {
        let isVesselCleaned = false;
        let currentTool = 'brush';
        let brushingComplete = false;
        
        // 工具选择
        toolBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                toolBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentTool = btn.dataset.tool;
                gameState.playSound('click');
            });
        });
        
        // 清空容器并设置初始状态
        piecesContainer.innerHTML = '';
        assemblyArea.innerHTML = '<p>点击器物进行清洗，清洗完成后会自动归位</p>';
        
        // 创建有裂缝的完整器物
        const vessel = document.createElement('div');
        vessel.className = 'cracked-vessel';
        vessel.id = 'cracked-vessel';
        vessel.dataset.cleaned = 'false';
        vessel.style.cssText = `
            width: ${isMobile ? '150px' : '200px'};
            height: ${isMobile ? '150px' : '200px'};
            background: url('images/damaged.jpg') center/cover no-repeat;
            border-radius: 15px;
            cursor: pointer;
            margin: 20px auto;
            transition: all 0.5s ease;
            filter: sepia(80%) saturate(150%) hue-rotate(20deg) brightness(0.7);
            border: 4px solid #8B4513;
            box-shadow: 0 0 15px rgba(139, 69, 19, 0.5);
            position: relative;
        `;
        
        // 添加裂缝效果
        const crackOverlay = document.createElement('div');
        crackOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 40%, rgba(0,0,0,0.8) 42%, rgba(0,0,0,0.8) 44%, transparent 46%),
                        linear-gradient(-30deg, transparent 60%, rgba(0,0,0,0.6) 62%, rgba(0,0,0,0.6) 64%, transparent 66%);
            border-radius: 15px;
            pointer-events: none;
        `;
        vessel.appendChild(crackOverlay);
        
        // 清洗功能 - 分两步：刷洗和冲水
        vessel.addEventListener('click', () => {
            if (currentTool === 'brush' && !brushingComplete) {
                gameState.playSound('brush');
                
                // 刷洗效果
                vessel.style.filter = 'sepia(40%) saturate(120%) hue-rotate(10deg) brightness(0.85)';
                vessel.style.transform = 'scale(1.02)';
                
                setTimeout(() => {
                    vessel.style.transform = 'scale(1)';
                }, 300);
                
                brushingComplete = true;
                showMessage('表面污垢已刷除！现在选择清水工具进行冲洗。');
                
            } else if (currentTool === 'water' && brushingComplete && !isVesselCleaned) {
                gameState.playSound('water');
                
                // 清洗动画
                vessel.style.filter = 'none';
                vessel.style.transform = 'scale(1.05)';
                vessel.style.boxShadow = '0 0 30px rgba(135, 206, 235, 0.8)';
                
                // 添加清洗水波效果
                const waterEffect = document.createElement('div');
                waterEffect.style.cssText = `
                    position: absolute;
                    top: -10px;
                    left: -10px;
                    right: -10px;
                    bottom: -10px;
                    border: 3px solid rgba(135, 206, 235, 0.6);
                    border-radius: 20px;
                    animation: waterRipple 1s ease-out;
                `;
                vessel.appendChild(waterEffect);
                
                setTimeout(() => {
                    vessel.style.transform = 'scale(1)';
                    vessel.style.boxShadow = '0 0 20px rgba(135, 206, 235, 0.5)';
                    waterEffect.remove();
                    
                    // 自动归位到中央区域
                    setTimeout(() => {
                        vessel.remove();
                        assemblyArea.innerHTML = `
                            <div style="
                                width: 250px; 
                                height: 250px; 
                                background: url('images/damaged.jpg') center/cover no-repeat; 
                                border-radius: 15px; 
                                animation: glow 2s infinite;
                                border: 3px solid #FFD700;
                                box-shadow: 0 0 25px rgba(255, 215, 0, 0.6);
                                margin: 20px auto;
                                position: relative;
                            ">
                                <div style="
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    right: 0;
                                    bottom: 0;
                                    background: linear-gradient(45deg, transparent 40%, rgba(255,215,0,0.3) 42%, rgba(255,215,0,0.3) 44%, transparent 46%),
                                                linear-gradient(-30deg, transparent 60%, rgba(255,215,0,0.2) 62%, rgba(255,215,0,0.2) 64%, transparent 66%);
                                    border-radius: 15px;
                                    pointer-events: none;
                                "></div>
                            </div>
                        `;
                        showMessage('器物清洗完成并已归位！裂缝清晰可见，准备进入下一步修复。');
                        document.getElementById('complete-btn').style.display = 'inline-block';
                    }, 800);
                }, 500);
                
                isVesselCleaned = true;
                showMessage('正在清洗器物表面...');
                
            } else if (currentTool === 'brush' && brushingComplete) {
                showMessage('已经刷洗过了，请选择清水工具进行冲洗！');
            } else if (currentTool === 'water' && !brushingComplete) {
                showMessage('请先选择毛刷工具清除表面污垢！');
            }
        });
        
        piecesContainer.appendChild(vessel);
        
        // 添加清洗说明
        const instruction = document.createElement('p');
        instruction.style.cssText = `
            text-align: center;
            color: #8B4513;
            font-size: 16px;
            margin: 20px;
            font-weight: bold;
        `;
        instruction.textContent = '先用毛刷清除污垢，再用清水冲洗';
        piecesContainer.appendChild(instruction);
        
        // 原来的碎片创建代码已被移除，现在使用完整器物清洗
    }
    
    // 移除旧的拖拽相关代码
    function addDragEvents(element) {
        if (element) {
            element.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', element.id);
                element.style.opacity = '0.5';
            });
            
            element.addEventListener('dragend', () => {
                element.style.opacity = '1';
            });
        }
    }
}

function initMarkingStep() {
    // 保持原有的标记步骤代码不变
    const canvas = document.getElementById('marking-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            // 标记步骤的原有逻辑保持不变
            let markCount = 0;
            const maxMarks = 6;
            const markPositions = [];
            
            canvas.addEventListener('click', (e) => {
                const rect = canvas.getBoundingClientRect();
                const scaleX = canvas.width / rect.width;
                const scaleY = canvas.height / rect.height;
                const x = (e.clientX - rect.left) * scaleX;
                const y = (e.clientY - rect.top) * scaleY;
                
                if (markCount < maxMarks) {
                    gameState.playSound('click');
                    
                    markPositions.push({x: x, y: y, id: markCount + 1});
                    
                    ctx.fillStyle = '#FFD700';
                    ctx.beginPath();
                    ctx.arc(x, y, 8, 0, 2 * Math.PI);
                    ctx.fill();
                    
                    ctx.strokeStyle = '#8B4513';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    
                    ctx.fillStyle = '#000';
                    ctx.font = 'bold 14px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText(markCount + 1, x, y + 5);
                    
                    markCount++;
                    
                    if (markCount >= maxMarks) {
                        showMessage('标记完成！所有钻孔位置已确定。');
                        document.getElementById('complete-btn').style.display = 'inline-block';
                        gameState.markPositions = markPositions;
                    }
                }
            });
        }
    }
}

// 清洗步骤修改完成，移除了旧的碎片代码

function addDragEvents(element) {
    element.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', element.id);
        element.style.opacity = '0.5';
    });
    
    element.addEventListener('dragend', () => {
        element.style.opacity = '1';
    });
}

function initMarkingStep() {
    // 初始化标记步骤
    const canvas = document.getElementById('marking-canvas');
    const ctx = canvas.getContext('2d');
    
    // 移动端canvas尺寸适配
    if (isMobile) {
        canvas.width = 300;
        canvas.height = 200;
    }
    
    // 检测移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (canvas && ctx) {
        // 移动端优化
        if (isMobile) {
            canvas.style.touchAction = 'none';
        }
        
        let markCount = 0;
        const maxMarks = 6;
        const markPositions = []; // 存储标记位置
        
        // 获取正确的坐标位置
        function getEventPos(e) {
            const rect = canvas.getBoundingClientRect();
            let clientX, clientY;
            
            if (e.touches && e.touches.length > 0) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }
            
            // 修复移动端坐标计算
            return {
                x: (clientX - rect.left) * (canvas.width / rect.width),
                y: (clientY - rect.top) * (canvas.height / rect.height)
            };
        }
        
        function handleMark(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const pos = getEventPos(e);
            
            if (markCount < maxMarks) {
                gameState.playSound('click');
                
                // 移动端触觉反馈
                if (isMobile && navigator.vibrate) {
                    navigator.vibrate(50);
                }
                
                // 存储标记位置
                markPositions.push({x: pos.x, y: pos.y, id: markCount + 1});
                
                // 绘制标记点 - 移动端增大标记点
                ctx.fillStyle = '#FFD700';
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, isMobile ? 12 : 8, 0, 2 * Math.PI);
                ctx.fill();
                
                // 添加边框
                ctx.strokeStyle = '#8B4513';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                // 添加编号
                ctx.fillStyle = '#000';
                ctx.font = isMobile ? 'bold 16px Arial' : 'bold 14px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(markCount + 1, pos.x, pos.y + (isMobile ? 6 : 5));
                
                markCount++;
                
                if (markCount >= maxMarks) {
                    showMessage('标记完成！所有钻孔位置已确定。');
                    document.getElementById('complete-btn').style.display = 'inline-block';
                    
                    // 将标记位置存储到gameState中供下一步使用
                    gameState.markPositions = markPositions;
                }
            }
        }
        
        // 添加事件监听器
        canvas.addEventListener('click', handleMark);
        canvas.addEventListener('touchstart', handleMark);
    }
}

function initDrillingStep() {
    // 初始化钻孔步骤
    const bowDrill = document.getElementById('bow-drill');
    const drillingTarget = document.getElementById('drilling-target');
    
    if (bowDrill && drillingTarget) {
        // 清理之前创建的钻孔目标
        drillingTarget.innerHTML = '';
        
        let drillCount = 0;
        const markPositions = gameState.markPositions || [];
        const maxDrills = Math.min(markPositions.length, 6);
        
        // 如果没有标记位置，使用默认位置
        if (markPositions.length === 0) {
            for (let i = 0; i < 3; i++) {
                markPositions.push({
                    x: 150 + i * 80,
                    y: 120 + i * 30,
                    id: i + 1
                });
            }
        }
        
        // 根据标记位置创建钻孔目标点
        markPositions.forEach((mark, i) => {
            if (i >= 6) return; // 最多6个钻孔点
            
            const target = document.createElement('div');
            // 坐标转换：从canvas坐标转换到drilling-target坐标
            const scaleX = isMobile ? 300 / 300 : 400 / 400; // 保持1:1比例
            const scaleY = isMobile ? 200 / 200 : 300 / 300; // 保持1:1比例
            const adjustedX = mark.x * scaleX;
            const adjustedY = mark.y * scaleY;
            
            target.style.cssText = `
                position: absolute;
                width: 40px;
                height: 40px;
                background: #FFD700;
                border-radius: 50%;
                left: ${adjustedX - 20}px;
                top: ${adjustedY - 20}px;
                cursor: pointer;
                border: 3px solid #8B4513;
                box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                color: #8B4513;
                font-size: 14px;
            `;
            target.textContent = mark.id;
            target.dataset.drilled = 'false';
            
            let isDrilling = false;
            let drillProgress = 0;
            let drillInterval = null;
            
            // 添加触摸和鼠标事件支持
            function startDrilling(e) {
                e.preventDefault();
                if (target.dataset.drilled === 'true') return;
                
                isDrilling = true;
                drillProgress = 0;
                
                // 显示弓钻拉拽动画
                target.style.background = 'radial-gradient(circle, #ff6b6b 0%, #feca57 50%, #48dbfb 100%)';
                target.style.animation = 'drill-rotate 0.1s linear infinite';
                
                // 开始钻孔进度
                drillInterval = setInterval(() => {
                    if (isDrilling) {
                        drillProgress += 3;
                        target.style.transform = `scale(${1 + drillProgress/200})`;
                        
                        // 播放钻孔音效
                        if (drillProgress % 20 === 0) {
                            gameState.playSound('drill');
                        }
                        
                        if (drillProgress >= 100) {
                            // 钻孔完成
                            target.style.background = '#654321';
                            target.style.animation = 'none';
                            target.style.transform = 'scale(0.8)';
                            target.dataset.drilled = 'true';
                            target.innerHTML = '●';
                            target.style.color = '#FFD700';
                            target.style.fontSize = '16px';
                            drillCount++;
                            
                            // 保存钻孔位置供安装步骤使用
                            if (!gameState.drilledPositions) {
                                gameState.drilledPositions = [];
                            }
                            // 存储转换后的坐标
                            const scaleX = isMobile ? 300 / 300 : 400 / 400;
                            const scaleY = isMobile ? 200 / 200 : 300 / 300;
                            gameState.drilledPositions.push({
                                x: mark.x * scaleX,
                                y: mark.y * scaleY,
                                id: mark.id
                            });
                            
                            clearInterval(drillInterval);
                            isDrilling = false;
                            
                            showMessage(`钻孔完成！还需要钻制 ${maxDrills - drillCount} 个孔洞。`);
                            
                            if (drillCount >= maxDrills) {
                                setTimeout(() => {
                                    showMessage('所有孔洞钻制完成！手拉弓钻技艺精湛！');
                                    document.getElementById('complete-btn').style.display = 'inline-block';
                                }, 500);
                            }
                        }
                    }
                }, 50);
            }
            
            function stopDrilling() {
                if (drillInterval) {
                    clearInterval(drillInterval);
                }
                isDrilling = false;
                if (target.dataset.drilled === 'false') {
                    target.style.animation = 'none';
                    target.style.transform = 'scale(1)';
                    target.style.background = '#FFD700';
                    drillProgress = 0;
                    showMessage('需要持续按住拖拽来操作弓钻！');
                }
            }
            
            // 添加鼠标和触摸事件
            target.addEventListener('mousedown', startDrilling);
            target.addEventListener('mouseup', stopDrilling);
            target.addEventListener('mouseleave', stopDrilling);
            
            // 触摸事件支持
            target.addEventListener('touchstart', startDrilling, { passive: false });
            target.addEventListener('touchend', (e) => {
                e.preventDefault();
                stopDrilling();
            });
            target.addEventListener('touchcancel', (e) => {
                e.preventDefault();
                stopDrilling();
            });
            
            drillingTarget.appendChild(target);
        });
    }
}

function initForgingStep() {
    // 初始化锻造步骤
    const hammer = document.getElementById('hammer');
    const metalStrip = document.getElementById('metal-strip');
    const anvilArea = document.querySelector('.anvil-area');
    
    if (hammer && metalStrip && anvilArea) {
        // 清理之前创建的锻造点
        const existingForgePoints = anvilArea.querySelectorAll('div[data-hit-count]');
        existingForgePoints.forEach(point => point.remove());
        
        let forgeCount = 0;
        const maxForges = 5;
        let isDragging = false;
        let hammerOffset = { x: 0, y: 0 };
        
        // 设置锤子为可拖拽
        hammer.style.cssText = `
            position: fixed;
            font-size: 3em;
            cursor: grab;
            left: 100px;
            top: 400px;
            z-index: 1000;
            user-select: none;
            pointer-events: auto;
        `;
        
        // 使用之前标记的位置创建锻造点
        const markPositions = gameState.markPositions || [];
        const actualForges = Math.min(markPositions.length, 6); // 最多6个锻造点
        
        if (markPositions.length === 0) {
            // 如果没有标记位置，使用默认位置
            showMessage('未找到标记位置，使用默认锻造点。');
            for (let i = 0; i < 5; i++) {
                createForgePoint(180 + i * 35, 140, i + 1);
            }
        } else {
            // 使用实际标记位置，根据容器尺寸进行坐标转换
            showMessage(`在 ${actualForges} 个标记位置进行锻造塑形。`);
            for (let i = 0; i < actualForges; i++) {
                const mark = markPositions[i];
                // 坐标转换：从canvas坐标转换到anvil-area坐标
                const scaleX = isMobile ? 300 / 300 : 400 / 400; // 保持1:1比例
                const scaleY = isMobile ? 200 / 200 : 300 / 300; // 保持1:1比例
                const adjustedX = mark.x * scaleX;
                const adjustedY = mark.y * scaleY;
                createForgePoint(adjustedX, adjustedY, mark.id);
            }
        }
        
        function createForgePoint(x, y, id) {
            const forgePoint = document.createElement('div');
            forgePoint.style.cssText = `
                position: absolute;
                width: 30px;
                height: 30px;
                background: rgba(255, 215, 0, 0.8);
                border-radius: 50%;
                left: ${x - 15}px;
                top: ${y - 15}px;
                border: 2px solid #FFD700;
                animation: pulse 2s infinite;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 9px;
                color: #333;
                font-weight: bold;
                box-shadow: 0 2px 8px rgba(255, 215, 0, 0.4);
            `;
            
            forgePoint.dataset.hitCount = '0';
            forgePoint.dataset.requiredHits = '3';
            forgePoint.dataset.pointId = id;
            forgePoint.innerHTML = `${id}:0/3`;
            
            anvilArea.appendChild(forgePoint);
        }
        
        // 锤子拖拽事件 - 简化版本
        function startDrag(e) {
            isDragging = true;
            hammer.style.cursor = 'grabbing';
            
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);
            
            hammerOffset.x = clientX - parseInt(hammer.style.left);
            hammerOffset.y = clientY - parseInt(hammer.style.top);
            
            e.preventDefault();
        }
        
        function drag(e) {
            if (!isDragging) return;
            
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);
            
            const newX = clientX - hammerOffset.x;
            const newY = clientY - hammerOffset.y;
            
            // 限制在屏幕范围内
            const maxX = window.innerWidth - 60;
            const maxY = window.innerHeight - 60;
            
            hammer.style.left = Math.max(0, Math.min(maxX, newX)) + 'px';
            hammer.style.top = Math.max(0, Math.min(maxY, newY)) + 'px';
            
            e.preventDefault();
        }
        
        function endDrag(e) {
            if (!isDragging) return;
            
            isDragging = false;
            hammer.style.cursor = 'grab';
            
            // 获取锤子和锻造区域的位置
            const hammerRect = hammer.getBoundingClientRect();
            const anvilRect = anvilArea.getBoundingClientRect();
            
            // 检查锤子是否击中锻造点 - 简化版本
            const forgePoints = anvilArea.querySelectorAll('div[data-hit-count]');
            
            forgePoints.forEach(point => {
                if (point.dataset.forged === 'true') return;
                
                const pointRect = point.getBoundingClientRect();
                
                // 检查锤子和锻造点是否重叠
                const hammerCenterX = hammerRect.left + hammerRect.width / 2;
                const hammerCenterY = hammerRect.top + hammerRect.height / 2;
                const pointCenterX = pointRect.left + pointRect.width / 2;
                const pointCenterY = pointRect.top + pointRect.height / 2;
                
                const distance = Math.sqrt(
                    Math.pow(hammerCenterX - pointCenterX, 2) + 
                    Math.pow(hammerCenterY - pointCenterY, 2)
                );
                
                console.log(`锤子位置: (${hammerCenterX}, ${hammerCenterY}), 锻造点位置: (${pointCenterX}, ${pointCenterY}), 距离: ${distance}`);
                
                // 增大检测范围，便于调试
                if (distance < 50) {
                    console.log('触发锻造点:', point.dataset.pointId);
                    hitForgePoint(point);
                    return;
                }
            });
        }
        
        function hitForgePoint(forgePoint) {
            gameState.playSound('click');
            
            let hitCount = parseInt(forgePoint.dataset.hitCount);
            const requiredHits = parseInt(forgePoint.dataset.requiredHits);
            hitCount++;
            
            forgePoint.dataset.hitCount = hitCount;
            
            // 创建火花效果
            createSparks(forgePoint);
            
            // 锤击动画
            hammer.style.transform = 'scale(1.2) rotate(-15deg)';
            forgePoint.style.transform = 'scale(0.8)';
            forgePoint.style.background = '#FF6B6B';
            
            setTimeout(() => {
                hammer.style.transform = 'scale(1) rotate(0deg)';
                forgePoint.style.transform = 'scale(1)';
                forgePoint.style.background = hitCount >= requiredHits ? '#654321' : 'rgba(255, 215, 0, 0.8)';
            }, 150);
            
            // 获取锻造点ID
            const pointId = forgePoint.innerHTML.split(':')[0];
            
            // 更新显示
            forgePoint.innerHTML = `${pointId}:${hitCount}/${requiredHits}`;
            forgePoint.style.color = '#FFF';
            
            if (hitCount >= requiredHits) {
                // 标记为已锻造
                forgePoint.style.animation = 'none';
                forgePoint.dataset.forged = 'true';
                forgePoint.innerHTML = `${pointId}:✓`;
                forgeCount++;
                
                // 改变金属条形状
                const totalForges = anvilArea.querySelectorAll('div[data-hit-count]').length;
                const progress = forgeCount / totalForges;
                metalStrip.style.transform = `scaleY(${1 + progress * 0.5}) rotate(${progress * 15}deg)`;
                metalStrip.style.background = `linear-gradient(90deg, #CD7F32, #B87333, #FFD700)`;
                metalStrip.style.borderRadius = `${progress * 20}px`;
                
                showMessage(`锻造点 ${forgeCount}/${totalForges} 完成！金属正在成型...`);
                
                if (forgeCount >= totalForges) {
                    setTimeout(() => {
                        showMessage('锔钉锻造完成！形状完美，可以用于修复！');
                        metalStrip.style.boxShadow = '0 0 20px #FFD700';
                        
                        // 锤子回到原位
                        hammer.style.left = '100px';
                        hammer.style.top = '400px';
                        hammer.style.cursor = 'default';
                        
                        // 移除拖拽事件监听器
                        hammer.removeEventListener('mousedown', startDrag);
                        hammer.removeEventListener('touchstart', startDrag);
                        document.removeEventListener('mousemove', drag);
                        document.removeEventListener('touchmove', drag);
                        document.removeEventListener('mouseup', endDrag);
                        document.removeEventListener('touchend', endDrag);
                        
                        document.getElementById('complete-btn').style.display = 'inline-block';
                    }, 500);
                }
            } else {
                showMessage(`继续锻造点${pointId}！拖拽锤子敲击，还需要 ${requiredHits - hitCount} 次。`);
            }
        }
        
        // 添加事件监听器
        hammer.addEventListener('mousedown', startDrag);
        hammer.addEventListener('touchstart', startDrag, { passive: false });
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag, { passive: false });
        
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag, { passive: false });
        
        // 初始提示
        showMessage('拖拽锤子到金属条上的锻造点进行塑形！');
    }
}

function createSparks(forgePoint) {
    // 在锻造点周围创建火花效果
    const container = forgePoint.parentElement;
    
    for (let i = 0; i < 15; i++) {
        const spark = document.createElement('div');
        spark.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: ${Math.random() > 0.5 ? '#FFD700' : '#FF6B6B'};
            border-radius: 50%;
            left: ${parseInt(forgePoint.style.left) + Math.random() * 60 - 30}px;
            top: ${parseInt(forgePoint.style.top) + Math.random() * 60 - 30}px;
            pointer-events: none;
            z-index: 20;
            animation: sparkle 0.8s ease-out forwards;
        `;
        
        container.appendChild(spark);
        
        setTimeout(() => {
            spark.remove();
        }, 500);
    }
}

function initInstallationStep() {
    // 初始化安装步骤
    const installHammer = document.getElementById('install-hammer');
    const vesselHoles = document.getElementById('vessel-holes');
    const staplesInventory = document.getElementById('staples-inventory');
    
    if (installHammer && vesselHoles && staplesInventory) {
        // 清理之前的内容
        staplesInventory.innerHTML = '';
        vesselHoles.innerHTML = '';
        
        let installCount = 0;
        const drilledPositions = gameState.drilledPositions || [];
        const maxInstalls = Math.max(drilledPositions.length, 3); // 使用实际钻孔数量
        
        // 创建锔钉库存 - 根据实际需要的数量，支持拖拽
        for (let i = 0; i < maxInstalls; i++) {
            const staple = document.createElement('div');
            staple.style.cssText = `
                width: 40px;
                height: 20px;
                background: linear-gradient(90deg, #CD7F32, #B87333);
                border-radius: 10px;
                margin: 10px auto;
                cursor: grab;
                transition: all 0.3s ease;
                position: relative;
                z-index: 10;
            `;
            staple.dataset.used = 'false';
            staple.draggable = true;
            
            // 检测移动设备
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

            if (isMobile) {
                // 移动端触摸拖拽
                let isDragging = false;
                let dragElement = null;

                staple.addEventListener('touchstart', (e) => {
                    if (staple.dataset.used === 'false') {
                        e.preventDefault();
                        isDragging = true;
                        const touch = e.touches[0];
                        
                        gameState.playSound('click');
                        
                        // 创建拖拽副本
                        dragElement = staple.cloneNode(true);
                        dragElement.style.position = 'fixed';
                        dragElement.style.zIndex = '9999';
                        dragElement.style.pointerEvents = 'none';
                        dragElement.style.opacity = '0.8';
                        dragElement.style.transform = 'scale(1.3)';
                        dragElement.style.left = (touch.clientX - 20) + 'px';
                        dragElement.style.top = (touch.clientY - 10) + 'px';
                        document.body.appendChild(dragElement);
                        
                        staple.style.opacity = '0.3';
                        showMessage('拖拽锔钉到孔洞上进行安装！检测范围已扩大');
                        
                        // 触觉反馈
                        if (navigator.vibrate) {
                            navigator.vibrate(50);
                        }
                    }
                });

                const handleTouchMove = (e) => {
                    if (isDragging && dragElement) {
                        e.preventDefault();
                        const touch = e.touches[0];
                        
                        dragElement.style.left = (touch.clientX - 20) + 'px';
                        dragElement.style.top = (touch.clientY - 10) + 'px';
                        
                        // 检查安装点 - 大幅扩大检测范围
                        const installPoints = document.querySelectorAll('[data-installed]');
                        installPoints.forEach(point => {
                            if (point.dataset.installed === 'false') {
                                const rect = point.getBoundingClientRect();
                                const centerX = rect.left + rect.width / 2;
                                const centerY = rect.top + rect.height / 2;
                                const distance = Math.sqrt(
                                    Math.pow(touch.clientX - centerX, 2) + 
                                    Math.pow(touch.clientY - centerY, 2)
                                );
                                
                                // 扩大检测范围到80px
                                if (distance < 80) {
                                    point.style.background = '#FFD700';
                                    point.style.transform = 'scale(1.8)';
                                    point.style.boxShadow = '0 0 25px rgba(255, 215, 0, 1)';
                                    point.style.border = '4px solid #FFD700';
                                } else {
                                    point.style.background = '#654321';
                                    point.style.transform = 'scale(1)';
                                    point.style.boxShadow = 'none';
                                    point.style.border = '2px solid #8B4513';
                                }
                            }
                        });
                    }
                };

                const handleTouchEnd = (e) => {
                    if (isDragging && dragElement) {
                        e.preventDefault();
                        isDragging = false;
                        
                        const touch = e.changedTouches[0];
                        let installed = false;
                        
                        const installPoints = document.querySelectorAll('[data-installed]');
                        installPoints.forEach(point => {
                            if (point.dataset.installed === 'false') {
                                const rect = point.getBoundingClientRect();
                                const centerX = rect.left + rect.width / 2;
                                const centerY = rect.top + rect.height / 2;
                                const distance = Math.sqrt(
                                    Math.pow(touch.clientX - centerX, 2) + 
                                    Math.pow(touch.clientY - centerY, 2)
                                );
                                
                                // 扩大安装范围到80px
                                if (distance < 80) {
                                    // 安装成功
                                    staple.style.transform = 'scale(0.8)';
                                    staple.style.cursor = 'not-allowed';
                                    staple.dataset.used = 'true';
                                    staple.style.background = '#666';
                                    
                                    point.style.background = '#FFD700';
                                    point.style.transform = 'scale(1.3)';
                                    point.dataset.installed = 'true';
                                    installCount++;
                                    
                                    setTimeout(() => {
                                        point.style.transform = 'scale(1)';
                                        point.innerHTML = '⚡';
                                        point.style.fontSize = '16px';
                                        point.style.color = '#8B4513';
                                        showMessage(`锔钉安装完成！还需安装 ${drilledPositions.length - installCount} 个。`);
                                        
                                        if (installCount >= drilledPositions.length) {
                                            setTimeout(() => {
                                                showMessage('所有锔钉安装完成！瓷器结构已加固。');
                                                document.getElementById('complete-btn').style.display = 'inline-block';
                                            }, 1000);
                                        }
                                    }, 300);
                                    
                                    installed = true;
                                    
                                    // 成功触觉反馈
                                    if (navigator.vibrate) {
                                        navigator.vibrate([100, 50, 100]);
                                    }
                                } else {
                                    // 重置样式
                                    point.style.background = '#654321';
                                    point.style.transform = 'scale(1)';
                                    point.style.boxShadow = 'none';
                                    point.style.border = '2px solid #8B4513';
                                }
                            }
                        });
                        
                        if (!installed) {
                            staple.style.opacity = '1';
                            showMessage('请将锔钉拖拽到孔洞附近！检测范围很大，不用太精确。');
                        }
                        
                        // 清理
                        if (dragElement) {
                            document.body.removeChild(dragElement);
                            dragElement = null;
                        }
                    }
                };

                document.addEventListener('touchmove', handleTouchMove, { passive: false });
                document.addEventListener('touchend', handleTouchEnd, { passive: false });
            } else {
                // 桌面端拖拽
                staple.addEventListener('dragstart', (e) => {
                    if (staple.dataset.used === 'false') {
                        gameState.playSound('click');
                        staple.style.cursor = 'grabbing';
                        staple.style.opacity = '0.8';
                        e.dataTransfer.setData('text/plain', i);
                        showMessage('拖拽锔钉到孔洞上进行安装！');
                    } else {
                        e.preventDefault();
                    }
                });
                
                staple.addEventListener('dragend', (e) => {
                    staple.style.cursor = 'grab';
                    staple.style.opacity = '1';
                });
            }
            
            staplesInventory.appendChild(staple);
        }
        
        // 使用之前钻孔步骤的实际位置创建安装点
        if (drilledPositions.length === 0) {
            // 如果没有钻孔位置数据，使用默认位置
            showMessage('未找到钻孔位置，使用默认安装点。');
            for (let i = 0; i < 3; i++) {
                createInstallPoint(120 + i * 60, 150 + i * 20, i);
            }
        } else {
            // 使用所有实际钻孔位置
            showMessage(`在 ${drilledPositions.length} 个钻孔位置安装锔钉。`);
            for (let i = 0; i < drilledPositions.length; i++) {
                const pos = drilledPositions[i];
                createInstallPoint(pos.x, pos.y, i);
            }
        }
        
        function createInstallPoint(x, y, index) {
            const installPoint = document.createElement('div');
            installPoint.style.cssText = `
                position: absolute;
                width: 25px;
                height: 25px;
                background: #654321;
                border-radius: 50%;
                left: ${x - 12}px;
                top: ${y - 12}px;
                cursor: pointer;
                border: 2px solid #8B4513;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                color: #FFD700;
                font-weight: bold;
                transition: all 0.3s ease;
            `;
            installPoint.dataset.installed = 'false';
            installPoint.innerHTML = '○';
            
            // 拖拽放置事件
            installPoint.addEventListener('dragover', (e) => {
                e.preventDefault(); // 允许放置
                if (installPoint.dataset.installed === 'false') {
                    installPoint.style.background = '#FFD700';
                    installPoint.style.transform = 'scale(1.2)';
                }
            });
            
            installPoint.addEventListener('dragleave', (e) => {
                if (installPoint.dataset.installed === 'false') {
                    installPoint.style.background = '#654321';
                    installPoint.style.transform = 'scale(1)';
                }
            });
            
            installPoint.addEventListener('drop', (e) => {
                e.preventDefault();
                
                if (installPoint.dataset.installed === 'false') {
                    const stapleIndex = e.dataTransfer.getData('text/plain');
                    const staple = staplesInventory.children[stapleIndex];
                    
                    if (staple && staple.dataset.used === 'false') {
                        gameState.playSound('hammer');
                        
                        // 标记锔钉为已使用
                        staple.dataset.used = 'true';
                        staple.style.opacity = '0.3';
                        staple.style.transform = 'scale(0.8)';
                        staple.draggable = false;
                        staple.style.cursor = 'not-allowed';
                        
                        // 安装动画
                        installPoint.style.background = '#FFD700';
                        installPoint.style.transform = 'scale(1.3)';
                        installPoint.dataset.installed = 'true';
                        installCount++;
                        
                        setTimeout(() => {
                            installPoint.style.transform = 'scale(1)';
                            installPoint.innerHTML = '⚡';
                            installPoint.style.fontSize = '14px';
                            installPoint.style.color = '#8B4513';
                            showMessage(`锔钉安装完成！还需安装 ${drilledPositions.length - installCount} 个。`);
                        }, 200);
                        
                        if (installCount >= drilledPositions.length) {
                            setTimeout(() => {
                                showMessage('所有锔钉安装完成！器物结构已加固！');
                                document.getElementById('complete-btn').style.display = 'inline-block';
                            }, 500);
                        }
                    } else {
                        showMessage('这个锔钉已经被使用了！');
                        installPoint.style.background = '#654321';
                        installPoint.style.transform = 'scale(1)';
                    }
                } else {
                    showMessage('这个孔洞已经安装了锔钉！');
                }
            });
            
            vesselHoles.appendChild(installPoint);
        }
    }
}

function initKintsugiStep() {
    // 初始化金缮步骤
    const canvas = document.getElementById('kintsugi-canvas');
    const ctx = canvas.getContext('2d');
    
    // 移动端canvas尺寸适配
    if (isMobile) {
        canvas.width = 300;
        canvas.height = 200;
    }
    const ingredients = document.querySelectorAll('.ingredient');
    const mixingBowl = document.getElementById('mixing-bowl');
    
    if (canvas && ctx && mixingBowl) {
        let selectedIngredients = [];
        let mixingComplete = false;
        let drawing = false;
        let paintCount = 0;
        let maxPaintCount = 200; // 降低金漆用量要求，适合移动端
        let goldPowderSelected = false;
        let lacquerSelected = false;
        let currentBrushSize = 8; // 增大默认笔刷大小，适合手指操作
        
        // 移动端检测
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                         ('ontouchstart' in window) || 
                         (navigator.maxTouchPoints > 0);
        
        if (isMobile) {
            currentBrushSize = 12; // 移动端使用更大的笔刷
            maxPaintCount = 150; // 移动端降低完成要求
            showMessage('📱 已优化移动端操作：笔刷更大，更易操作！');
        }
        
        // 初始化笔刷控制器
        const brushSizeSlider = document.getElementById('brush-size');
        const brushSizeDisplay = document.getElementById('brush-size-display');
        
        if (brushSizeSlider && brushSizeDisplay) {
            brushSizeSlider.value = currentBrushSize;
            brushSizeDisplay.textContent = currentBrushSize + 'px';
            brushSizeSlider.addEventListener('input', (e) => {
                currentBrushSize = parseInt(e.target.value);
                brushSizeDisplay.textContent = currentBrushSize + 'px';
            });
        }
        
        // 重置状态
        ingredients.forEach(ingredient => {
            ingredient.classList.remove('selected');
        });
        mixingBowl.style.background = '';
        
        // 配料选择 - 必须包含金粉，优化移动端交互
        ingredients.forEach(ingredient => {
            // 添加触摸事件支持
            const handleSelection = (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                if (!ingredient.classList.contains('selected')) {
                    gameState.playSound('click');
                    
                    // 移动端触觉反馈
                    if (navigator.vibrate) {
                        navigator.vibrate(30);
                    }
                    
                    // 添加选中动画
                    ingredient.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        ingredient.style.transform = 'scale(1)';
                    }, 150);
                    
                    ingredient.classList.add('selected');
                    const ingredientType = ingredient.dataset.ingredient;
                    selectedIngredients.push(ingredientType);
                    
                    // 检查是否选择了金粉和漆
                    if (ingredientType === 'gold') {
                        goldPowderSelected = true;
                    } else if (ingredientType === 'lacquer') {
                        lacquerSelected = true;
                    }
                    
                    // 更新调料碗颜色和检查配方
                    if (goldPowderSelected && lacquerSelected) {
                        mixingBowl.style.background = 'linear-gradient(145deg, #FFD700, #FFA500)';
                        mixingBowl.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.6)';
                        mixingBowl.style.transform = 'scale(1.05)';
                        setTimeout(() => {
                            mixingBowl.style.transform = 'scale(1)';
                        }, 300);
                        
                        mixingComplete = true;
                        showMessage('✅ 金漆调制完成！现在可以在瓷器上描绘金线了。');
                        
                        // 成功调制的触觉反馈
                        if (navigator.vibrate) {
                            navigator.vibrate([50, 30, 50]);
                        }
                        
                        // 显示金漆用量提示 - 移动端优化位置
                        let paintInfo = document.getElementById('paint-info');
                        if (!paintInfo) {
                            paintInfo = document.createElement('div');
                            paintInfo.style.cssText = `
                                position: fixed;
                                top: ${isMobile ? '60px' : '10px'};
                                right: 10px;
                                background: rgba(0,0,0,0.9);
                                color: #FFD700;
                                padding: ${isMobile ? '15px' : '10px'};
                                border-radius: 8px;
                                font-size: ${isMobile ? '16px' : '14px'};
                                font-weight: bold;
                                z-index: 1000;
                                border: 2px solid #FFD700;
                                box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
                            `;
                            paintInfo.id = 'paint-info';
                            document.body.appendChild(paintInfo);
                        }
                        paintInfo.innerHTML = `🎨 金漆剩余：${maxPaintCount - paintCount}`;
                        
                    } else if (selectedIngredients.length >= 2 && !goldPowderSelected) {
                        mixingBowl.style.background = 'linear-gradient(145deg, #8B4513, #A0522D)';
                        showMessage('❌ 金缮必须使用金粉！请重新选择配料。');
                        
                        // 错误的触觉反馈
                        if (navigator.vibrate) {
                            navigator.vibrate([100, 50, 100]);
                        }
                        
                        // 重置选择
                        setTimeout(() => {
                            ingredients.forEach(ing => {
                                ing.classList.remove('selected');
                                ing.style.transform = 'scale(1)';
                            });
                            selectedIngredients = [];
                            goldPowderSelected = false;
                            lacquerSelected = false;
                            mixingBowl.style.background = '';
                            mixingBowl.style.boxShadow = '';
                            mixingBowl.style.transform = 'scale(1)';
                            mixingComplete = false;
                        }, 2000);
                    } else {
                        // 部分选择状态
                        const progress = selectedIngredients.length / 2;
                        mixingBowl.style.background = `linear-gradient(145deg, rgba(255,215,0,${progress}), rgba(255,165,0,${progress}))`;
                        
                        const ingredientNames = {
                            'gold': '金粉',
                            'lacquer': '天然漆',
                            'silver': '银粉'
                        };
                        
                        const selectedNames = selectedIngredients.map(ing => ingredientNames[ing] || ing);
                        showMessage(`已选择：${selectedNames.join('、')} ${goldPowderSelected ? '✓' : '(还需要金粉)'} ${lacquerSelected ? '✓' : '(还需要天然漆)'}`);
                    }
                }
            };
            
            // 同时支持点击和触摸
            ingredient.addEventListener('click', handleSelection);
            ingredient.addEventListener('touchend', handleSelection);
            
            // 防止双重触发
            ingredient.addEventListener('touchstart', (e) => {
                e.preventDefault();
            });
        });
        
        // 绘画功能 - 有用量限制
        canvas.addEventListener('mousedown', (e) => {
            if (mixingComplete && paintCount < maxPaintCount) {
                drawing = true;
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.strokeStyle = '#FFD700';
                ctx.lineWidth = currentBrushSize;
                ctx.lineCap = 'round';
                ctx.shadowColor = '#FFD700';
                ctx.shadowBlur = Math.max(2, currentBrushSize / 2);
            } else if (paintCount >= maxPaintCount) {
                showMessage('金漆用完了！需要重新调制。');
            }
        });
        
        canvas.addEventListener('mousemove', (e) => {
            if (drawing && mixingComplete && paintCount < maxPaintCount) {
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                ctx.lineTo(x, y);
                ctx.stroke();
                paintCount += 2; // 每次移动消耗2点金漆，加快进度
                
                // 更新金漆剩余显示
                const paintInfo = document.getElementById('paint-info');
                if (paintInfo) {
                    const remaining = maxPaintCount - paintCount;
                    paintInfo.innerHTML = `金漆剩余：${Math.max(0, remaining)}`;
                    
                    // 金漆不足时变红色警告
                    if (remaining < 30) {
                        paintInfo.style.color = '#FF6B6B';
                        paintInfo.innerHTML += ' ⚠️';
                    }
                }
                
                // 检查是否完成 - 降低完成要求
                if (paintCount >= 150) {
                    showMessage('金缮描绘完成！裂痕变成了美丽的金线！');
                    document.getElementById('complete-btn').style.display = 'inline-block';
                    drawing = false;
                    
                    // 移除金漆信息显示
                    const paintInfo = document.getElementById('paint-info');
                    if (paintInfo) {
                        paintInfo.remove();
                    }
                }
                
                // 金漆用完
                if (paintCount >= maxPaintCount) {
                    drawing = false;
                    showMessage('金漆用完了！如果还没完成，需要重新调制金漆。');
                    
                    // 重置调制状态，允许重新调制
                    setTimeout(() => {
                        if (paintCount < 150) { // 如果还没完成
                            ingredients.forEach(ing => ing.classList.remove('selected'));
                            selectedIngredients = [];
                            goldPowderSelected = false;
                            lacquerSelected = false;
                            mixingComplete = false;
                            mixingBowl.style.background = '';
                            mixingBowl.style.boxShadow = '';
                            maxPaintCount += 100; // 增加新的金漆用量
                            showMessage('可以重新调制金漆继续描绘。');
                        }
                    }, 1000);
                }
            }
        });
        
        canvas.addEventListener('mouseup', () => {
            drawing = false;
        });
        
        // 修复鼠标离开画布时停止描绘
        canvas.addEventListener('mouseleave', (e) => {
            if (drawing) {
                drawing = false;
                console.log('鼠标离开画布，停止描绘');
                // 结束当前路径
                ctx.stroke();
            }
        });
        
        // 鼠标重新进入画布时不自动开始绘制
        canvas.addEventListener('mouseenter', (e) => {
            // 不自动开始绘制，需要重新按下鼠标
        });
        
        // 优化的触摸事件支持 - 专为移动端设计
        let lastTouchX = 0;
        let lastTouchY = 0;
        let touchStartTime = 0;
        
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (mixingComplete && paintCount < maxPaintCount) {
                drawing = true;
                touchStartTime = Date.now();
                
                const rect = canvas.getBoundingClientRect();
                const touch = e.touches[0];
                
                // 使用更精确的坐标计算
                const scaleX = canvas.width / rect.width;
                const scaleY = canvas.height / rect.height;
                const x = (touch.clientX - rect.left) * scaleX;
                const y = (touch.clientY - rect.top) * scaleY;
                
                lastTouchX = x;
                lastTouchY = y;
                
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.strokeStyle = '#FFD700';
                ctx.lineWidth = currentBrushSize;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.shadowColor = '#FFD700';
                ctx.shadowBlur = Math.max(3, currentBrushSize / 2);
                
                // 移动端触觉反馈
                if (navigator.vibrate) {
                    navigator.vibrate(10);
                }
                
                // 立即绘制一个点，确保短触摸也有效果
                ctx.beginPath();
                ctx.arc(x, y, currentBrushSize / 2, 0, 2 * Math.PI);
                ctx.fill();
                paintCount += 1;
                
                showMessage('🎨 开始描绘金缮线条...');
                
            } else if (paintCount >= maxPaintCount) {
                showMessage('金漆用完了！需要重新调制。');
                // 触觉反馈提示
                if (navigator.vibrate) {
                    navigator.vibrate([100, 50, 100]);
                }
            } else if (!mixingComplete) {
                showMessage('请先调制金漆！选择金粉和天然漆。');
                if (navigator.vibrate) {
                    navigator.vibrate([50, 50, 50]);
                }
            }
        });
        
        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (drawing && mixingComplete && paintCount < maxPaintCount) {
                const rect = canvas.getBoundingClientRect();
                const touch = e.touches[0];
                
                // 使用更精确的坐标计算
                const scaleX = canvas.width / rect.width;
                const scaleY = canvas.height / rect.height;
                const x = (touch.clientX - rect.left) * scaleX;
                const y = (touch.clientY - rect.top) * scaleY;
                
                // 计算移动距离，避免过于频繁的绘制
                const distance = Math.sqrt(Math.pow(x - lastTouchX, 2) + Math.pow(y - lastTouchY, 2));
                
                if (distance > 2) { // 只有移动距离超过2像素才绘制
                    ctx.lineTo(x, y);
                    ctx.stroke();
                    
                    // 移动端减少消耗速度
                    paintCount += isMobile ? 0.5 : 1;
                    
                    lastTouchX = x;
                    lastTouchY = y;
                    
                    // 更新金漆剩余显示
                    const paintInfo = document.getElementById('paint-info');
                    if (paintInfo) {
                        const remaining = Math.max(0, maxPaintCount - paintCount);
                        paintInfo.innerHTML = `金漆剩余：${Math.floor(remaining)}`;
                        
                        if (remaining < 30) {
                            paintInfo.style.color = '#FF6B6B';
                            paintInfo.innerHTML += ' ⚠️';
                        }
                    }
                    
                    // 检查完成状态 - 移动端降低要求
                    const completionThreshold = isMobile ? 80 : 120;
                    if (paintCount >= completionThreshold) {
                        showMessage('🎉 金缮描绘完成！裂痕变成了美丽的金线！');
                        document.getElementById('complete-btn').style.display = 'inline-block';
                        drawing = false;
                        
                        // 成功完成的触觉反馈
                        if (navigator.vibrate) {
                            navigator.vibrate([200, 100, 200, 100, 200]);
                        }
                        
                        const paintInfo = document.getElementById('paint-info');
                        if (paintInfo) {
                            paintInfo.remove();
                        }
                        return;
                    }
                    
                    // 金漆用完检查
                    if (paintCount >= maxPaintCount) {
                        drawing = false;
                        showMessage('金漆用完了！如果还没完成，需要重新调制金漆。');
                        if (navigator.vibrate) {
                            navigator.vibrate([100, 50, 100]);
                        }
                    }
                }
            }
        });
        
        canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const touchDuration = Date.now() - touchStartTime;
            
            if (drawing) {
                drawing = false;
                
                // 如果是很短的触摸，给予额外的绘制效果
                if (touchDuration < 200 && mixingComplete) {
                    const rect = canvas.getBoundingClientRect();
                    const touch = e.changedTouches[0];
                    const scaleX = canvas.width / rect.width;
                    const scaleY = canvas.height / rect.height;
                    const x = (touch.clientX - rect.left) * scaleX;
                    const y = (touch.clientY - rect.top) * scaleY;
                    
                    // 绘制一个小圆点
                    ctx.beginPath();
                    ctx.arc(x, y, currentBrushSize / 2, 0, 2 * Math.PI);
                    ctx.fillStyle = '#FFD700';
                    ctx.fill();
                    paintCount += 2;
                }
                
                showMessage(`继续描绘裂缝，让破碎变成艺术！进度：${Math.floor((paintCount / (isMobile ? 80 : 120)) * 100)}%`);
            }
        });
        
        canvas.addEventListener('touchcancel', (e) => {
            e.preventDefault();
            e.stopPropagation();
            drawing = false;
        });
        
        // 防止页面滚动干扰绘画
        canvas.addEventListener('touchstart', (e) => {
            document.body.style.overflow = 'hidden';
        });
        
        canvas.addEventListener('touchend', (e) => {
            document.body.style.overflow = '';
        });
    }
}

function initFinishingStep() {
    // 初始化抛光步骤
    const completedVessel = document.getElementById('completed-vessel');
    const polishingArea = document.querySelector('.polishing-area');
    
    if (completedVessel && polishingArea) {
        let polishCount = 0;
        const maxPolish = 8;
        let isPolishing = false;
        
        // 创建抛光区域
        for (let i = 0; i < maxPolish; i++) {
            const polishSpot = document.createElement('div');
            polishSpot.style.cssText = `
                position: absolute;
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                left: ${100 + (i % 4) * 60}px;
                top: ${120 + Math.floor(i / 4) * 60}px;
                cursor: pointer;
                border: 2px dashed #FFF;
                transition: all 0.3s ease;
                animation: pulse 2s infinite;
            `;
            polishSpot.dataset.polished = 'false';
            
            // 鼠标按下开始抛光
            polishSpot.addEventListener('mousedown', (e) => {
                if (polishSpot.dataset.polished === 'true') return;
                
                isPolishing = true;
                let polishProgress = 0;
                
                const polishInterval = setInterval(() => {
                    if (isPolishing) {
                        polishProgress += 5;
                        polishSpot.style.background = `rgba(255, 215, 0, ${polishProgress/100})`;
                        polishSpot.style.transform = `scale(${1 + polishProgress/200})`;
                        
                        // 播放抛光音效
                        if (polishProgress % 20 === 0) {
                            gameState.playSound('brush');
                        }
                        
                        if (polishProgress >= 100) {
                            // 抛光完成
                            polishSpot.style.background = 'rgba(255, 215, 0, 0.8)';
                            polishSpot.style.border = '2px solid #FFD700';
                            polishSpot.style.animation = 'none';
                            polishSpot.style.boxShadow = '0 0 15px #FFD700';
                            polishSpot.dataset.polished = 'true';
                            polishSpot.innerHTML = '✨';
                            polishSpot.style.fontSize = '20px';
                            polishSpot.style.textAlign = 'center';
                            polishSpot.style.lineHeight = '36px';
                            polishCount++;
                            
                            clearInterval(polishInterval);
                            isPolishing = false;
                            
                            // 增加整体光泽效果
                            const brightness = 1 + (polishCount * 0.15);
                            completedVessel.style.filter = `brightness(${brightness}) contrast(1.3) saturate(1.2)`;
                            completedVessel.style.boxShadow = `0 0 ${polishCount * 5}px rgba(255, 215, 0, 0.6)`;
                            
                            showMessage(`抛光进度：${polishCount}/${maxPolish} - 器物越来越光亮！`);
                            
                            if (polishCount >= maxPolish) {
                                setTimeout(() => {
                                    showMessage('抛光完成！器物焕然一新，金光闪闪！');
                                    completedVessel.style.animation = 'glow 2s infinite';
                                    setTimeout(() => {
                                        showFinalPresentation();
                                    }, 1000);
                                }, 500);
                            }
                        }
                    }
                }, 50);
                
                // 鼠标松开停止抛光
                const stopPolishing = () => {
                    clearInterval(polishInterval);
                    isPolishing = false;
                    if (polishSpot.dataset.polished === 'false') {
                        polishSpot.style.transform = 'scale(1)';
                        polishSpot.style.background = 'rgba(255, 255, 255, 0.3)';
                        showMessage('需要持续按住来抛光这个区域！');
                    }
                };
                
                polishSpot.addEventListener('mouseup', stopPolishing);
                polishSpot.addEventListener('mouseleave', stopPolishing);
            }); // 这里有多余的 });
            
            polishingArea.appendChild(polishSpot);
        }
        
        showMessage('用软布仔细抛光每个区域，让器物重现光泽！');
    }
}

function showFinalPresentation() {
    const finalPresentation = document.getElementById('final-presentation');
    if (finalPresentation) {
        finalPresentation.style.display = 'flex';
        
        // 隐藏步骤控制按钮
        const stepControls = document.querySelector('.step-controls');
        if (stepControls) {
            stepControls.style.display = 'none';
        }
        
        // 显示步骤总结
        const stepSummary = finalPresentation.querySelector('.step-summary');
        if (stepSummary) {
            stepSummary.innerHTML = `
                <h3 style="color: #8B4513; margin-bottom: 20px;">锯瓷修复完成总结</h3>
                <div style="text-align: left; color: #654321; line-height: 1.6;">
                    <p><strong>第一步：</strong>捧匣与启封 - 了解器物故事，建立情感连接</p>
                    <p><strong>第二步：</strong>洗净与归位 - 清洗碎片，拼合复原</p>
                    <p><strong>第三步：</strong>找碴与定点 - 精确标记钻孔位置</p>
                    <p><strong>第四步：</strong>牵钻与引孔 - 手拉弓钻，节奏钻孔</p>
                    <p><strong>第五步：</strong>锻钉与塑形 - 锻造锔钉，火花四溅</p>
                    <p><strong>第六步：</strong>落锤与扣合 - 安装锔钉，固定裂缝</p>
                    <p><strong>第七步：</strong>调浆与弥缝 - 金缮工艺，艺术升华</p>
                    <p><strong>第八步：</strong>拂尘与归还 - 抛光完成，重现光泽</p>
                </div>
                <p style="color: #8B4513; margin-top: 20px; font-style: italic;">
                    通过传统锯瓷工艺，破碎的器物不仅得到修复，更获得了新的生命和美感。
                    这就是中国传统手工艺的魅力所在！
                </p>
            `;
        }
        
        // 显示感谢信
        const thankYouLetter = finalPresentation.querySelector('.thank-you-letter');
        if (thankYouLetter) {
            thankYouLetter.innerHTML = '<p style="color: #8B4513; padding: 10px; font-size: 1em; font-weight: bold;">感谢您精湛的修复技艺，这件传家宝重新焕发了生机！</p>';
        }
        
        // 显示完成照片
        const completionPhoto = finalPresentation.querySelector('.completion-photo');
        if (completionPhoto) {
            completionPhoto.style.backgroundImage = 'url("images/repaired.jpg")';
            completionPhoto.style.backgroundSize = 'cover';
            completionPhoto.style.backgroundPosition = 'center';
        }
    }
}

// 主菜单和界面切换函数
function startGame() {
    document.getElementById('main-menu').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
    gameState.showStep(1);
}

function showTutorial() {
    document.getElementById('main-menu').classList.remove('active');
    document.getElementById('tutorial-screen').classList.add('active');
    gameState.playSound('click');
}

function showSettings() {
    document.getElementById('main-menu').classList.remove('active');
    document.getElementById('settings-screen').classList.add('active');
    gameState.playSound('click');
}

// 设置页面功能
function toggleSound() {
    const soundToggle = document.getElementById('sound-toggle');
    if (gameState) {
        gameState.soundEnabled = soundToggle.checked;
        gameState.playSound('click');
        showMessage(soundToggle.checked ? '音效已开启' : '音效已关闭');
    }
}

function toggleBackgroundMusic() {
    const musicToggle = document.getElementById('music-toggle');
    if (gameState) {
        gameState.musicEnabled = musicToggle.checked;
        gameState.toggleBackgroundMusic();
        showMessage(musicToggle.checked ? '背景音乐已开启' : '背景音乐已关闭');
    }
}

function changeMusicVolume() {
    const volumeSlider = document.getElementById('music-volume');
    if (gameState) {
        const volume = volumeSlider.value / 100;
        gameState.setMusicVolume(volume);
        showMessage(`音乐音量：${volumeSlider.value}%`);
    }
}

function changeDifficulty() {
    const difficultySelect = document.getElementById('difficulty-select');
    const difficulty = difficultySelect.value;
    gameState.playSound('click');
    
    switch(difficulty) {
        case 'easy':
            showMessage('难度设置为：简单 - 更多提示和帮助');
            break;
        case 'normal':
            showMessage('难度设置为：普通 - 标准游戏体验');
            break;
        case 'hard':
            showMessage('难度设置为：困难 - 挑战你的技艺');
            break;
    }
}

function toggleHints() {
    const hintsToggle = document.getElementById('hints-toggle');
    gameState.playSound('click');
    showMessage(hintsToggle.checked ? '操作提示已开启' : '操作提示已关闭');
}

function backToMenu() {
    // 隐藏所有屏幕
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // 隐藏最终展示
    const finalPresentation = document.getElementById('final-presentation');
    if (finalPresentation) {
        finalPresentation.style.display = 'none';
    }
    
    // 显示步骤控制按钮
    const stepControls = document.querySelector('.step-controls');
    if (stepControls) {
        stepControls.style.display = 'flex';
    }
    
    // 显示主菜单
    document.getElementById('main-menu').classList.add('active');
    
    // 重置游戏状态
    if (gameState) {
        gameState.currentStep = 1;
        gameState.updateProgress();
        gameState.updateStepTitle();
        gameState.playSound('click');
    }
}

function restartGame() {
    console.log('restartGame函数被调用');
    
    // 播放点击音效
    if (gameState) {
        gameState.playSound('click');
    }
    
    // 显示确认对话框
    if (confirm('确定要重新开始游戏吗？当前进度将会丢失。')) {
        // 重置所有游戏状态
        if (gameState) {
            gameState.currentStep = 1;
            gameState.stepProgress = {};
            gameState.updateProgress();
            gameState.updateStepTitle();
        }
        
        // 隐藏所有步骤屏幕
        document.querySelectorAll('.step-screen').forEach(step => {
            step.classList.add('hidden');
        });
        
        // 隐藏所有步骤内容区域
        document.querySelectorAll('.step-content').forEach(content => {
            content.classList.add('hidden');
        });
        
        // 重置所有步骤介绍区域的显示状态
        document.querySelectorAll('.step-intro').forEach(intro => {
            intro.classList.remove('hidden');
        });
        
        // 显示第一步屏幕和介绍
        const step1 = document.getElementById('step1');
        const step1Intro = document.getElementById('step1-intro');
        if (step1) {
            step1.classList.remove('hidden');
        }
        if (step1Intro) {
            step1Intro.classList.remove('hidden');
        }
        
        // 重置各步骤的特定状态
        resetAllStepStates();
        
        // 重新初始化第一步
        if (gameState && gameState.initStep1) {
            gameState.initStep1();
        }
        
        // 显示重新开始成功的消息
        showMessage('游戏已重新开始！准备开始修复之旅吧！');
    }
}

function resetAllStepStates() {
    // 重置第一步状态
    const boxContent = document.getElementById('box-content');
    const storyText = document.getElementById('story-text');
    if (boxContent) boxContent.classList.add('hidden');
    if (storyText) storyText.classList.add('hidden');
    
    // 重置第二步清洗状态
    window.brushingComplete = false;
    window.isVesselCleaned = false;
    window.currentTool = null;
    
    // 重置第三步标记状态
    window.markCount = 0;
    window.maxMarks = 5;
    
    // 重置第四步钻孔状态
    window.drillCount = 0;
    window.maxDrills = 5;
    window.drillProgress = 0;
    
    // 重置第五步锻造状态
    window.forgeCount = 0;
    window.totalForges = 5;
    
    // 重置第六步安装状态
    window.installCount = 0;
    window.selectedStaple = null;
    
    // 重置第七步金缮状态
    window.mixingComplete = false;
    window.paintCount = 0;
    window.maxPaintCount = 100;
    window.drawing = false;
    
    // 重置第八步抛光状态
    window.polishCount = 0;
    window.maxPolish = 10;
    
    // 清除所有动态生成的标记点、钻孔点等
    document.querySelectorAll('.mark-point, .drill-point, .forge-point, .install-point, .polish-spot').forEach(el => {
        el.remove();
    });
    
    // 重置所有完成按钮
    document.querySelectorAll('#complete-btn').forEach(btn => {
        btn.style.display = 'none';
    });
    
    // 重置画布
    const canvas = document.getElementById('painting-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function openLetter() {
    console.log('openLetter函数被调用'); // 调试信息
    const storyText = document.getElementById('step1-story-text');
    if (storyText) {
        console.log('找到step1-story-text元素'); // 调试信息
        gameState.playSound('click');
        storyText.classList.remove('hidden');
        storyText.innerHTML = `
            <div style="background: rgba(255, 255, 255, 0.95); color: #000; padding: 30px; border-radius: 15px; font-size: 1.4em; font-weight: bold; line-height: 1.8; margin-top: 20px;">
                <h3 style="color: #8B4513; margin-bottom: 20px;">委托信</h3>
                <p style="color: #000;">尊敬的修复大师：</p>
                <p style="color: #000;">这是祖母留下的茶碗，承载着三代人的回忆。</p>
                <p style="color: #000;">不小心被孩子打碎了，全家人都很难过。</p>
                <p style="color: #000;">希望您能用精湛的技艺让它重获新生，</p>
                <p style="color: #000;">让这份珍贵的记忆得以延续。</p>
                <p style="color: #000; margin-top: 20px; text-align: right;">此致敬礼<br>李家敬上</p>
            </div>
        `;
        
        setTimeout(() => {
            showMessage('了解了器物的故事，现在开始修复之旅！');
            const completeBtn = document.getElementById('complete-btn');
            if (completeBtn) {
                completeBtn.style.display = 'inline-block';
            }
        }, 2000);
    } else {
        console.log('未找到step1-story-text元素'); // 调试信息
    }
}

// 消息显示函数
function showMessage(text) {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
        const message = document.createElement('div');
        message.className = 'message';
        message.textContent = text;
        
        messageContainer.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
}

// 视频展示功能
function showVideoGallery() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById('video-gallery-screen').classList.add('active');
}

function playVideo(videoId) {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('modal-video');
    const title = document.getElementById('video-title');
    const desc = document.getElementById('video-desc');
    
    // 根据视频ID设置不同的标题和描述
    const videoData = {
        'video1': {
            title: '传统锯瓷工艺全程',
            description: '完整展示锯瓷修复的八个步骤，从捧匣启封到最终完成，体验传统工艺的精妙之处。'
        },
        'video2': {
            title: '瓷器修复技法详解',
            description: '专业师傅演示瓷器修复的核心技巧，包括清洁、标记、钻孔、锻造等关键步骤。'
        },
        'video3': {
            title: '金缮工艺展示',
            description: '用黄金修复破碎的美，展现"金缮"这一独特的东方美学理念和修复哲学。'
        }
    };
    
    const data = videoData[videoId] || videoData['video1'];
    title.textContent = data.title;
    desc.textContent = data.description;
    
    modal.style.display = 'block';
    video.currentTime = 0; // 重置视频到开始位置
    
    // 点击模态框外部关闭视频
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeVideo();
        }
    };
}

function closeVideo() {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('modal-video');
    
    modal.style.display = 'none';
    video.pause(); // 暂停视频播放
    video.currentTime = 0; // 重置视频位置
}

// 键盘事件处理
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeVideo();
    }
});

// 音乐控制器功能
function toggleMusicPlayPause() {
    if (gameState && gameState.backgroundMusic) {
        const btn = document.getElementById('music-play-pause');
        if (gameState.backgroundMusic.paused) {
            gameState.playBackgroundMusic();
            btn.textContent = '⏸️';
            btn.title = '暂停背景音乐';
        } else {
            gameState.pauseBackgroundMusic();
            btn.textContent = '🎵';
            btn.title = '播放背景音乐';
        }
    }
}

function adjustVolume() {
    const volumeSlider = document.getElementById('volume-slider');
    const volume = volumeSlider.value / 100;
    if (gameState) {
        gameState.setMusicVolume(volume);
    }
    
    // 更新音量按钮图标
    const volumeBtn = document.querySelector('.volume-btn');
    if (volume === 0) {
        volumeBtn.textContent = '🔇';
    } else if (volume < 0.5) {
        volumeBtn.textContent = '🔉';
    } else {
        volumeBtn.textContent = '🔊';
    }
}

function toggleMute() {
    const volumeSlider = document.getElementById('volume-slider');
    const volumeBtn = document.querySelector('.volume-btn');
    
    if (volumeSlider.value > 0) {
        // 静音
        volumeSlider.dataset.previousValue = volumeSlider.value;
        volumeSlider.value = 0;
        volumeBtn.textContent = '🔇';
    } else {
        // 取消静音
        const previousValue = volumeSlider.dataset.previousValue || 40;
        volumeSlider.value = previousValue;
        volumeBtn.textContent = previousValue < 50 ? '🔉' : '🔊';
    }
    
    adjustVolume();
}

// 初始化游戏
let gameState;
document.addEventListener('DOMContentLoaded', () => {
    gameState = new GameState();
    
    // 确保页面加载时先显示开场剧情
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById('story-intro').classList.add('active');
    
    // 初始化开场剧情
    initStoryIntro();
    
    // 初始化音乐控制器
    initMusicController();
    
    // 确保所有步骤的事件监听器都已设置
    setupStepEventListeners();
});

function setupStepEventListeners() {
    // 检测是否为移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    // 确保第一步的启封功能正常工作
    const boxLock = document.getElementById('box-lock');
    if (boxLock && gameState) {
        // 移除可能存在的旧监听器
        boxLock.replaceWith(boxLock.cloneNode(true));
        const newBoxLock = document.getElementById('box-lock');
        
        // 为移动端添加触摸事件
        const handleUnlock = (e) => {
            e.preventDefault();
            e.stopPropagation();
            gameState.playSound('unlock');
            
            // 移动端触觉反馈
            if (isMobile && navigator.vibrate) {
                navigator.vibrate(100);
            }
            
            // 开锁动画
            newBoxLock.style.transform = 'translate(-50%, -50%) rotate(90deg)';
            newBoxLock.style.opacity = '0';
            
            setTimeout(() => {
                newBoxLock.style.display = 'none';
                const boxContent = document.getElementById('box-content');
                if (boxContent) {
                    boxContent.classList.remove('hidden');
                    boxContent.style.animation = 'slideIn 0.5s ease-out';
                    
                    // 确保信封点击事件正常工作
                    const letter = document.getElementById('letter');
                    if (letter) {
                        console.log('设置信封点击事件'); // 调试信息
                        letter.style.cursor = 'pointer';
                        letter.style.border = '3px solid #FFD700'; // 添加金色边框使其更明显
                        letter.title = '点击查看委托信'; // 添加提示
                        
                        // 移动端额外的视觉提示
                        if (isMobile) {
                            letter.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
                            // 添加脉冲动画提示
                            letter.style.animation = 'pulse 2s infinite';
                        }
                    }
                }
            }, 300);
        };
        
        // 同时绑定点击和触摸事件
        newBoxLock.addEventListener('click', handleUnlock);
        if (isMobile) {
            newBoxLock.addEventListener('touchstart', handleUnlock);
        }
    }
}

function initMusicController() {
    // 监听背景音乐播放状态变化
    if (gameState && gameState.backgroundMusic) {
        gameState.backgroundMusic.addEventListener('play', () => {
            const btn = document.getElementById('music-play-pause');
            btn.textContent = '⏸️';
            btn.title = '暂停背景音乐';
        });
        
        gameState.backgroundMusic.addEventListener('pause', () => {
            const btn = document.getElementById('music-play-pause');
            btn.textContent = '🎵';
            btn.title = '播放背景音乐';
        });
    }
    
    // 同步音量滑块
    const volumeSlider = document.getElementById('volume-slider');
    const musicVolumeSlider = document.getElementById('music-volume');
    const volumeDisplay = document.getElementById('volume-display');
    
    if (volumeSlider && musicVolumeSlider) {
        // 同步两个音量控制器
        volumeSlider.addEventListener('input', () => {
            musicVolumeSlider.value = volumeSlider.value;
            if (volumeDisplay) {
                volumeDisplay.textContent = volumeSlider.value + '%';
            }
        });
        
        musicVolumeSlider.addEventListener('input', () => {
            volumeSlider.value = musicVolumeSlider.value;
            if (volumeDisplay) {
                volumeDisplay.textContent = musicVolumeSlider.value + '%';
            }
            adjustVolume();
        });
    }
}