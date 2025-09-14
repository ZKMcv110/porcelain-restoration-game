// 游戏状态管理
class GameState {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 8;
        this.stepProgress = {};
        this.sounds = {};
        this.soundEnabled = true;
        this.audioContext = null;
        this.init();
        this.initAudio();
    }

    init() {
        this.setupEventListeners();
        this.updateProgress();
        this.initStep1();
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
        let cleanedPieces = 0;
        let assembledPieces = 0;
        let currentTool = 'brush';
        const totalPieces = 6;
        
        // 工具选择
        toolBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                toolBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentTool = btn.dataset.tool;
                gameState.playSound('click');
            });
        });
        
        // 创建碎片
        for (let i = 0; i < totalPieces; i++) {
            const piece = document.createElement('div');
            piece.className = 'ceramic-piece';
            piece.id = `piece-${i}`;
            piece.style.width = '60px';
            piece.style.height = '60px';
            piece.style.background = 'url("images/damaged.jpg") center/cover no-repeat';
            piece.style.borderRadius = '10px';
            piece.style.cursor = 'pointer';
            piece.style.filter = 'sepia(50%) brightness(0.7)';
            piece.style.transition = 'all 0.3s ease';
            piece.style.position = 'relative';
            piece.draggable = false;
            piece.dataset.brushed = 'false';
            piece.dataset.watered = 'false';
            piece.dataset.cleaned = 'false';
            piece.dataset.assembled = 'false';
            
            // 清洗功能
            piece.addEventListener('click', () => {
                if (currentTool === 'brush' && piece.dataset.brushed === 'false') {
                    gameState.playSound('brush');
                    piece.style.filter = 'sepia(30%) brightness(0.8)';
                    piece.dataset.brushed = 'true';
                    showMessage('用毛刷刷掉了表面的污垢，现在用清水冲洗！');
                } else if (currentTool === 'water' && piece.dataset.brushed === 'true' && piece.dataset.watered === 'false') {
                    gameState.playSound('brush');
                    piece.style.filter = 'none';
                    piece.style.transform = 'scale(1.1)';
                    piece.dataset.watered = 'true';
                    piece.dataset.cleaned = 'true';
                    piece.draggable = true;
                    piece.style.cursor = 'grab';
                    cleanedPieces++;
                    
                    setTimeout(() => {
                        piece.style.transform = 'scale(1)';
                    }, 200);
                    
                    // 添加拖拽事件
                    addDragEvents(piece);
                    
                    if (cleanedPieces === totalPieces) {
                        showMessage('所有碎片已清洗完毕！现在将它们拖拽到中央区域进行拼合。');
                    }
                }
            });
            
            piecesContainer.appendChild(piece);
        }
        
        // 设置拼合区域为拖拽目标
        assemblyArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            assemblyArea.style.background = 'rgba(255, 215, 0, 0.3)';
        });
        
        assemblyArea.addEventListener('dragleave', () => {
            assemblyArea.style.background = 'rgba(0, 0, 0, 0.5)';
        });
        
        assemblyArea.addEventListener('drop', (e) => {
            e.preventDefault();
            assemblyArea.style.background = 'rgba(0, 0, 0, 0.5)';
            
            const pieceId = e.dataTransfer.getData('text/plain');
            const piece = document.getElementById(pieceId);
            
            if (piece && piece.dataset.assembled === 'false') {
                gameState.playSound('click');
                
                // 从原容器中移除碎片
                if (piece.parentNode) {
                    piece.parentNode.removeChild(piece);
                }
                
                // 移动碎片到拼合区域
                piece.style.position = 'relative';
                piece.style.margin = '5px';
                piece.dataset.assembled = 'true';
                piece.draggable = false;
                assemblyArea.appendChild(piece);
                assembledPieces++;
                
                if (assembledPieces === totalPieces) {
                    setTimeout(() => {
                        // 显示完整的器物
                        assemblyArea.innerHTML = '<div style="width: 200px; height: 200px; background: url(\'images/damaged.jpg\') center/cover no-repeat; border-radius: 15px; animation: glow 2s infinite;"></div>';
                        showMessage('拼合完成！器物重现完整形态！');
                        document.getElementById('complete-btn').style.display = 'inline-block';
                    }, 500);
                }
            }
        });
    }
}

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
    
    if (canvas && ctx) {
        let markCount = 0;
        const maxMarks = 6;
        
        canvas.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            if (markCount < maxMarks) {
                gameState.playSound('click');
                
                // 绘制标记点
                ctx.fillStyle = '#FFD700';
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, 2 * Math.PI);
                ctx.fill();
                
                // 添加编号
                ctx.fillStyle = '#000';
                ctx.font = '12px Arial';
                ctx.fillText(markCount + 1, x - 3, y + 3);
                
                markCount++;
                
                if (markCount >= maxMarks) {
                    showMessage('标记完成！所有钻孔位置已确定。');
                    document.getElementById('complete-btn').style.display = 'inline-block';
                }
            }
        });
    }
}

function initDrillingStep() {
    // 初始化钻孔步骤
    const bowDrill = document.getElementById('bow-drill');
    const drillingTarget = document.getElementById('drilling-target');
    
    if (bowDrill && drillingTarget) {
        let drillCount = 0;
        
        // 创建钻孔目标点
        for (let i = 0; i < 3; i++) {
            const target = document.createElement('div');
            target.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                background: #FFD700;
                border-radius: 50%;
                left: ${100 + i * 80}px;
                top: ${100 + i * 30}px;
                cursor: pointer;
                border: 3px solid #8B4513;
                box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
            `;
            target.dataset.drilled = 'false';
            
            let isDrilling = false;
            let drillProgress = 0;
            let drillInterval = null;
            
            // 鼠标按下开始拉弓钻孔
            target.addEventListener('mousedown', (e) => {
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
                            target.style.color = '#000';
                            target.style.fontSize = '12px';
                            target.style.textAlign = 'center';
                            target.style.lineHeight = '14px';
                            drillCount++;
                            
                            clearInterval(drillInterval);
                            isDrilling = false;
                            
                            showMessage(`钻孔完成！还需要钻制 ${3 - drillCount} 个孔洞。`);
                            
                            if (drillCount >= 3) {
                                setTimeout(() => {
                                    showMessage('所有孔洞钻制完成！手拉弓钻技艺精湛！');
                                    document.getElementById('complete-btn').style.display = 'inline-block';
                                }, 500);
                            }
                        }
                    }
                }, 50);
            });
            
            // 鼠标松开停止拉弓
            target.addEventListener('mouseup', () => {
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
            });
            
            // 鼠标离开也停止
            target.addEventListener('mouseleave', () => {
                if (drillInterval) {
                    clearInterval(drillInterval);
                }
                isDrilling = false;
                if (target.dataset.drilled === 'false') {
                    target.style.animation = 'none';
                    target.style.transform = 'scale(1)';
                    target.style.background = '#FFD700';
                    drillProgress = 0;
                }
            });
            
            drillingTarget.appendChild(target);
        }
    }
}

function initForgingStep() {
    // 初始化锻造步骤
    const hammer = document.getElementById('hammer');
    const metalStrip = document.getElementById('metal-strip');
    const anvilArea = document.querySelector('.anvil-area');
    
    if (hammer && metalStrip && anvilArea) {
        let forgeCount = 0;
        const maxForges = 5;
        
        // 创建锻造点
        for (let i = 0; i < maxForges; i++) {
            const forgePoint = document.createElement('div');
            forgePoint.style.cssText = `
                position: absolute;
                width: 30px;
                height: 30px;
                background: rgba(255, 215, 0, 0.8);
                border-radius: 50%;
                left: ${150 + i * 40}px;
                top: 200px;
                cursor: pointer;
                border: 3px solid #8B4513;
                z-index: 10;
                animation: pulse 2s infinite;
            `;
            forgePoint.dataset.forged = 'false';
            
            let hitCount = 0;
            const requiredHits = 3;
            
            forgePoint.addEventListener('click', () => {
                if (forgePoint.dataset.forged === 'false') {
                    hitCount++;
                    gameState.playSound('hammer');
                    
                    // 创建火花效果
                    createSparks(forgePoint);
                    
                    // 锤击动画
                    forgePoint.style.transform = 'scale(0.8)';
                    forgePoint.style.background = '#FF6B6B';
                    
                    setTimeout(() => {
                        forgePoint.style.transform = 'scale(1)';
                        forgePoint.style.background = hitCount >= requiredHits ? '#654321' : 'rgba(255, 215, 0, 0.8)';
                    }, 100);
                    
                    // 显示进度
                    forgePoint.innerHTML = `${hitCount}/${requiredHits}`;
                    forgePoint.style.fontSize = '10px';
                    forgePoint.style.color = '#FFF';
                    forgePoint.style.textAlign = 'center';
                    forgePoint.style.lineHeight = '24px';
                    
                    if (hitCount >= requiredHits) {
                        // 标记为已锻造
                        forgePoint.style.animation = 'none';
                        forgePoint.dataset.forged = 'true';
                        forgePoint.innerHTML = '✓';
                        forgeCount++;
                        
                        // 改变金属条形状
                        const progress = forgeCount / maxForges;
                        metalStrip.style.transform = `scaleY(${1 + progress * 0.5}) rotate(${progress * 15}deg)`;
                        metalStrip.style.background = `linear-gradient(90deg, #CD7F32, #B87333, #FFD700)`;
                        metalStrip.style.borderRadius = `${progress * 20}px`;
                        
                        showMessage(`锻造点 ${forgeCount}/${maxForges} 完成！金属正在成型...`);
                        
                        if (forgeCount >= maxForges) {
                            setTimeout(() => {
                                showMessage('锔钉锻造完成！形状完美，可以用于修复！');
                                metalStrip.style.boxShadow = '0 0 20px #FFD700';
                                document.getElementById('complete-btn').style.display = 'inline-block';
                            }, 500);
                        }
                    } else {
                        showMessage(`继续敲击！还需要 ${requiredHits - hitCount} 次敲击来塑形这个点。`);
                    }
                }
            });
            
            anvilArea.appendChild(forgePoint);
        }
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
        let installCount = 0;
        const maxInstalls = 3;
        
        // 创建锔钉库存
        for (let i = 0; i < maxInstalls; i++) {
            const staple = document.createElement('div');
            staple.style.cssText = `
                width: 40px;
                height: 20px;
                background: linear-gradient(90deg, #CD7F32, #B87333);
                border-radius: 10px;
                margin: 10px auto;
                cursor: pointer;
                transition: all 0.3s ease;
            `;
            staple.dataset.used = 'false';
            
            staple.addEventListener('click', () => {
                if (staple.dataset.used === 'false') {
                    gameState.playSound('click');
                    staple.style.opacity = '0.5';
                    staple.dataset.used = 'true';
                    showMessage('锔钉已选中，点击器物上的孔洞进行安装。');
                }
            });
            
            staplesInventory.appendChild(staple);
        }
        
        // 创建安装点
        for (let i = 0; i < maxInstalls; i++) {
            const installPoint = document.createElement('div');
            installPoint.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                background: #654321;
                border-radius: 50%;
                left: ${120 + i * 60}px;
                top: ${150 + i * 20}px;
                cursor: pointer;
                border: 2px solid #8B4513;
            `;
            installPoint.dataset.installed = 'false';
            
            installPoint.addEventListener('click', () => {
                if (installPoint.dataset.installed === 'false') {
                    gameState.playSound('hammer');
                    
                    // 安装动画
                    installPoint.style.background = '#FFD700';
                    installPoint.style.transform = 'scale(1.2)';
                    installPoint.dataset.installed = 'true';
                    installCount++;
                    
                    setTimeout(() => {
                        installPoint.style.transform = 'scale(1)';
                        installPoint.innerHTML = '⚡';
                        installPoint.style.fontSize = '12px';
                        installPoint.style.textAlign = 'center';
                        installPoint.style.lineHeight = '16px';
                    }, 200);
                    
                    if (installCount >= maxInstalls) {
                        setTimeout(() => {
                            showMessage('所有锔钉安装完成！器物结构已加固！');
                            document.getElementById('complete-btn').style.display = 'inline-block';
                        }, 500);
                    }
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
    const ingredients = document.querySelectorAll('.ingredient');
    const mixingBowl = document.getElementById('mixing-bowl');
    
    if (canvas && ctx && mixingBowl) {
        let selectedIngredients = [];
        let mixingComplete = false;
        let drawing = false;
        let paintCount = 0;
        
        // 配料选择
        ingredients.forEach(ingredient => {
            ingredient.addEventListener('click', () => {
                if (!ingredient.classList.contains('selected')) {
                    gameState.playSound('click');
                    ingredient.classList.add('selected');
                    selectedIngredients.push(ingredient.dataset.ingredient);
                    
                    // 更新调料碗颜色
                    if (selectedIngredients.length >= 2) {
                        mixingBowl.style.background = 'linear-gradient(145deg, #FFD700, #FFA500)';
                        mixingComplete = true;
                        showMessage('金漆调制完成！现在可以沿着裂缝描绘了。');
                    }
                }
            });
        });
        
        // 绘画功能
        canvas.addEventListener('mousedown', (e) => {
            if (mixingComplete) {
                drawing = true;
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.strokeStyle = '#FFD700';
                ctx.lineWidth = 3;
                ctx.lineCap = 'round';
            }
        });
        
        canvas.addEventListener('mousemove', (e) => {
            if (drawing && mixingComplete) {
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                ctx.lineTo(x, y);
                ctx.stroke();
                paintCount++;
                
                if (paintCount > 100) {
                    showMessage('金缮描绘完成！裂痕变成了美丽的金线！');
                    document.getElementById('complete-btn').style.display = 'inline-block';
                    drawing = false;
                }
            }
        });
        
        canvas.addEventListener('mouseup', () => {
            drawing = false;
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
            });
            
            polishingArea.appendChild(polishSpot);
        }
        
        showMessage('用软布仔细抛光每个区域，让器物重现光泽！');
    }
}

function showFinalPresentation() {
    const finalPresentation = document.getElementById('final-presentation');
    if (finalPresentation) {
        finalPresentation.style.display = 'flex';
        
        // 显示步骤总结
        const stepSummary = finalPresentation.querySelector('.step-summary');
        if (stepSummary) {
            stepSummary.innerHTML = `
                <h3 style="color: #8B4513; margin-bottom: 20px;">焗瓷修复完成总结</h3>
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
                    通过传统焗瓷工艺，破碎的器物不仅得到修复，更获得了新的生命和美感。
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

function showGallery() {
    document.getElementById('main-menu').classList.remove('active');
    document.getElementById('gallery-screen').classList.add('active');
    gameState.playSound('click');
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

function openLetter() {
    const storyText = document.getElementById('story-text');
    if (storyText) {
        gameState.playSound('click');
        storyText.classList.remove('hidden');
        storyText.innerHTML = `
            <div style="background: rgba(255, 255, 255, 0.95); color: #000; padding: 30px; border-radius: 15px; font-size: 1.4em; font-weight: bold; line-height: 1.8;">
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
            document.getElementById('complete-btn').style.display = 'inline-block';
        }, 2000);
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
            title: '传统焗瓷工艺全程',
            description: '完整展示焗瓷修复的八个步骤，从捧匣启封到最终完成，体验传统工艺的精妙之处。'
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

// 初始化游戏
let gameState;
document.addEventListener('DOMContentLoaded', () => {
    gameState = new GameState();
    
    // 确保页面加载时只显示主菜单
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById('main-menu').classList.add('active');
});