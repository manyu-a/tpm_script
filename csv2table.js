javascipt:(function() {
    // CSSを作成
    const style = document.createElement('style');
    style.textContent = `
        #overlay {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            height: 280px;
            background-color: rgba(0, 0, 0, 0.9);
            z-index: 9999;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        #overlay button, #overlay .close, #overlay textarea {
            margin: 10px;
            padding: 10px;
            font-size: 16px;
            border-radius: 5px;
        }
        #overlay button {
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
        }
        #overlay button:hover {
            background-color: #45a049;
        }
        #overlay .button-container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 10px; /* ボタン間の隙間 */
            width: 100%; /* 横幅いっぱいに */
        }
        #overlay .close {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: #f44336;
            color: white;
            border: none;
        }
        #overlay .close:hover {
            background-color: #d32f2f;
        }
        #overlay textarea {
            width: 90%;
            height: 60px;
            border: 1px solid #ccc;
            background-color: #333;
            color: white;
        }
    `;
    document.head.appendChild(style);

    function showCopyDialog(message) {
        return new Promise((resolve) => {
            const style = document.createElement('style');
            style.textContent = `
                #custom-dialog {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 340px;
                    background: rgba(0, 0, 0, 0.9);
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    padding: 20px;
                    z-index: 10000;
                    color: #333;
                }
                #custom-dialog textarea {
                    width: 100%;
                    height: 150px;
                    margin-bottom: 10px;
                    background-color: #333;
                    color: white;
                    font-size: 14px;
                }
                #custom-dialog .button-container {
                    display: flex;
                    justify-content: space-around;
                    align-items: stretch; 
                    gap: 10px;
                }
                #custom-dialog button {
                    margin: 10px;
                    padding: 10px 20px;
                    font-size: 14px;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                #custom-dialog button:hover {
                    background-color: #45a049;
                }
            `;
            document.head.appendChild(style);

            // ダイアログ要素を作成
            const dialog = document.createElement('div');
            dialog.id = 'custom-dialog';

            // テキストエリア
            const textarea = document.createElement('textarea');
            textarea.value = message;

            // OKボタン
            const okButton = document.createElement('button');
            okButton.textContent = 'OK';
            okButton.onclick = () => {
                document.body.removeChild(dialog);
                document.head.removeChild(style); // スタイルも削除
                resolve(); // プロミスを解決
            };
            // コピーボタン
            const copyButton = document.createElement('button');
            copyButton.textContent = 'コピー';
            copyButton.onclick = () => {
                const current_message = textarea.value;
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(current_message).then(() => {
                        showToast('クリップボードにコピーしました');
                    }).catch((e) => {
                        showToast('クリップボードへのコピーに失敗しました: ' + e.message);
                    });
                }else{
                    const textarea = document.createElement('textarea');
                    textarea.value = current_message;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    showToast('クリップボードにコピーしました');
                }
            }
            // ダイアログに要素を追加
            dialog.appendChild(textarea);
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            buttonContainer.appendChild(okButton);
            buttonContainer.appendChild(copyButton);
            dialog.appendChild(buttonContainer);
            document.body.appendChild(dialog);
        });
    }

    function showToast(message, duration = 3000) {
        // CSSを作成
        const style = document.createElement('style');
        style.textContent = `
            #toast {
                position: fixed;
                bottom: -100px; /* 初期位置は画面外 */
                left: 50%;
                transform: translateX(-50%);
                background-color: #333;
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                font-size: 14px;
                opacity: 0;
                transition: all 0.5s ease; /* アニメーション効果 */
                z-index: 10000;
            }
            #toast.show {
                bottom: 30px; /* 表示位置 */
                opacity: 1;   /* 表示状態 */
            }
        `;
        document.head.appendChild(style);

        // アラート要素を作成
        const toast = document.createElement('div');
        toast.id = 'toast';
        toast.textContent = message;

        // アラートをドキュメントに追加
        document.body.appendChild(toast);

        // アラートを表示
        setTimeout(() => {
            toast.classList.add('show');
        }, 100); // アニメーションのための遅延

        // アラートを非表示にして削除
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
                document.head.removeChild(style); // スタイルも削除
            }, 500); // フェードアウト後に削除
        }, duration);
    }

    // クリアタイプの色の定義
    const clearTypeColors = {
        "NO PLAY": "transparent",     // 無色（透明）
        "FAILED": "#808080",          // 灰色
        "EASY CLEAR": "#00FF00",      // 緑
        "ASSIST CLEAR": "#800080",    // 紫
        "CLEAR": "#0000FF",           // 青
        "HARD CLEAR": "#FF0000",      // 赤
        "EX HARD CLEAR": "#FFFF00",   // 黄色
        "FULLCOMBO CLEAR": "#FFA500"  // オレンジ
    };
    
    // オーバーレイを作成
    const overlay = document.createElement('div');
    overlay.id = 'overlay';

    // バツボタンを作成
    const close = document.createElement('button');
    close.className = 'close';
    close.textContent = '×';
    close.onclick = function() {
        document.body.removeChild(overlay);
    };

    // テキストボックスを作成
    const textarea = document.createElement('textarea');
    textarea.placeholder = 'CSVデータを貼り付けてください';

    const storedCsvKey = 'savedCsvData';
    const saveButton = document.createElement('button');
    saveButton.textContent = '保存';
    saveButton.onclick = function() {
        const csvData = textarea.value.trim();
        if (csvData) {
            localStorage.setItem(storedCsvKey, csvData); // ローカルストレージに保存
            showToast('CSVデータを保存しました');
        } else {
            showToast('保存するCSVデータがありません');
        }
    };

    // 「復元」ボタンを作成
    const restoreButton = document.createElement('button');
    restoreButton.textContent = '復元';
    restoreButton.onclick = function() {
        try {
            const savedData = localStorage.getItem(storedCsvKey);
            if (savedData) {
                textarea.value = savedData; // テキストエリアに復元
                showToast('CSVデータを復元しました');
            } else {
                showToast('復元するCSVデータがありません');
            }
        } catch (e) {
            showToast('エラーが発生しました: ' + e.message);
        }
    };

    // 比較用に前回のデータを取得
    const old_savedData = localStorage.getItem(storedCsvKey);
    const diffButton = document.createElement('button');
    diffButton.textContent = '差分表示';
    diffButton.onclick = function() {
        let savedCsv = '';
        if (old_savedData !== null) {
            savedCsv = old_savedData;
        } else {
            savedCsv = localStorage.getItem(storedCsvKey);
        }
        const currentCsv = textarea.value.trim();

        if (!savedCsv || !currentCsv) {
            showToast('保存されたデータまたは現在のデータがありません');
            return;
        }

        // CSVを解析してオブジェクト化
        function parseCsv(csv) {
            const rows = csv.split('\n');
            return rows.slice(1).map(row => {
                const cols = row.split(',');
                return {
                    title: cols[1],                // 曲名
                    blamp: cols[10],               // BEGINNER クリアタイプ（列11)
                    nlamp: cols[17],               // NORMAL クリアタイプ（列18）
                    hlamp: cols[24],               // HYPER クリアタイプ（列25）
                    alamp: cols[31],               // ANOTHER クリアタイプ（列32）
                    llamp: cols[38],               // LEGGENDARIA クリアタイプ（列39）
                    bscore: parseInt(cols[6], 10), // BEGINNER スコア（列14）
                    nscore: parseInt(cols[13], 10),// NORMAL スコア（列15）
                    hscore: parseInt(cols[20], 10),// HYPER スコア（列21）
                    ascore: parseInt(cols[27], 10),// ANOTHER スコア（列28）
                    lscore: parseInt(cols[34], 10),// LEGGENDARIA スコア（列35）
                    blevel: parseInt(cols[5], 10), // BEGINNER レベル（列6）
                    nlevel: parseInt(cols[12], 10),// NORMAL レベル（列13）
                    hlevel: parseInt(cols[19], 10),// HYPER レベル（列20）
                    alevel: parseInt(cols[26], 10),// ANOTHER レベル（列27）
                    llevel: parseInt(cols[33], 10),// LEGGENDARIA レベル（列34）
                };
            });
        }
        const lampKeys = ['blamp', 'nlamp', 'hlamp', 'alamp', 'llamp'];
        const scoreKeys = ['bscore', 'nscore', 'hscore', 'ascore', 'lscore'];
        const savedData = parseCsv(savedCsv);
        const currentData = parseCsv(currentCsv);

        // 差分を計算
        const lampDiffs = [];
        const scoreDiffs = [];
        const lampReplace = {
            "ASSIST CLEAR" : "足",
            "EASY CLEAR" : "易",
            "CLEAR" : "ノマゲ",
            "HARD CLEAR" : "ハード",
            "EX HARD CLEAR" : "エクハ",
            "FULLCOMBO CLEAR" : "フルコン"
        };
        currentData.forEach(current => {
            let saved = savedData.find(saved => saved.title === current.title);
            if (!saved) {
                saved = {blamp: 'NO PLAY', nlamp: 'NO PLAY', hlamp: 'NO PLAY', alamp: 'NO PLAY'}
            }
            if (saved) {
                // ランプの差分
                lampKeys.forEach(lampKey => {
                    
                    if (current[lampKey] !== saved[lampKey] && lampReplace[current[lampKey]] !== undefined) {
                        const lampcap = (lampKey === 'alamp') ? "" : `(${lampKey.toUpperCase()[0]})`;
                        lampDiffs.push([
                            `☆${current[lampKey[0]+'level']}${lampReplace[current[lampKey]]}`, 
                            `${current.title}${lampcap}`,
                            current[lampKey[0]+'level']
                        ]);// 例：[☆10ハード CLEAR, A(H)]
                    }
                });
                // スコアの差分
                scoreKeys.forEach(scoreKey => {
                    if (current[scoreKey] !== saved[scoreKey]) {
                        const lampcap = (scoreKey === 'alamp') ? "" : `(${scoreKey.toUpperCase()[0]})`;
                        scoreDiffs.push([
                            `☆${current[scoreKey[0]+'level']}`, 
                            `${current.title}${lampcap} スコア: ${saved[scoreKey]} → ${current[scoreKey]}`,
                            current[scoreKey[0]+'level']
                        ]);// 例：[☆10, A(H) スコア: 1300 → 1360]
                    }
                });
            }
        });

        // 差分を表示
        if (lampDiffs.length > 0) {
            let message = '';
            lampDiffs.sort((a, b) => {
                if (a[2] < b[2]) return -1;
                if (a[2] > b[2]) return 1;
                return 0;
            });
            
            const groupedDiffs = lampDiffs.reduce((groups, diff) => {
                if (!groups[diff[0]]) {
                    groups[diff[0]] = [];
                }
                groups[diff[0]].push(diff[1]);
                return groups;
            }, {});

            Object.keys(groupedDiffs).forEach(difficulty => {
                const diffs = groupedDiffs[difficulty];
                const difficultyMessage = diffs
                    .map(diff => `${diff}`)
                    .join('\n');
                message += `\n\n${difficulty}\n${difficultyMessage}`;
            });
            
            
            showCopyDialog('ランプの差分:' + message);
        } else {
            showToast('ランプの差分はありません');
        }

        // if (scoreDiffs.length > 0) {
        //     alert('スコアの差分:\n' + scoreDiffs.join('\n\n'));
        // } else {
        //     alert('スコアの差分はありません');
        // }
    };


    // 「色付け」ボタンを作成
    const loadButton = document.createElement('button');
    loadButton.textContent = '色付け';
    loadButton.onclick = function() {
        try {
            const csv = textarea.value.trim();
            if (!csv) {
                showToast('CSVが空です');
                return;
            }

            // ページ内のすべての行を取得（テーブルを想定）
            const rows_data = document.querySelectorAll('table tr'); 
            // CSVを解析
            const rows = csv.split('\n');
            const result = rows.slice(1).map(row => {
                const cols = row.split(',');
                const title = cols[1]; // 曲名
                const hyperDifficulty = parseInt(cols[19], 10); // HYPER 難易度（列20）
                const anotherDifficulty = parseInt(cols[26], 10); // ANOTHER 難易度（列27）
                const leggendDifficulty = parseInt(cols[33], 10); // LEGGENDARIA 難易度（列34）
                const hyperClearType = cols[24]; // HYPER クリアタイプ（列25）
                const anotherClearType = cols[31]; // ANOTHER クリアタイプ（列32）
                const leggendClearType = cols[38]; // LEGGENDARIA クリアタイプ（列39）
                // 条件に該当する場合のみ返す
                let result = [];
                if (hyperDifficulty === 11){
                    // 全行検索と背景色設定
                    rows_data.forEach(row => {
                        // 曲名デバッグ用
                        // if (row.innerText.includes(title)){
                        //     console.log(row.querySelector('td:nth-child(2)').innerText.trim(), title);
                        // }
                        if (row.querySelector('td:nth-child(2)').innerText.trim() === title+"(H)") {
                            row.style.backgroundColor = clearTypeColors[hyperClearType];
                        }
                    });
                    result.push({
                        title: title,
                        difficulty: "(H)",
                        ClearType: hyperClearType
                    });
                }
                if (anotherDifficulty === 11) {
                    // 全行検索と背景色設定
                    rows_data.forEach(row => {
                        // 曲名デバッグ用
                        // if (row.innerText.includes(title)){
                        //     console.log(row.querySelector('td:nth-child(2)').innerText.trim(), title);
                        // }
                        if (row.querySelector('td:nth-child(2)').innerText.trim() === title) {
                            row.style.backgroundColor = clearTypeColors[anotherClearType];
                        }
                    });
                    result.push({
                        title: title,
                        difficulty: "(A)",
                        ClearType: anotherClearType
                    });
                }
                if (leggendDifficulty === 11) {
                    // 全行検索と背景色設定
                    rows_data.forEach(row => {
                        // 曲名デバッグ用
                        // if (row.innerText.includes(title)){
                        //     console.log(row.querySelector('td:nth-child(2)').innerText.trim(), title);
                        // }
                        if (row.querySelector('td:nth-child(2)').innerText.trim() === title+"(L)") {
                            row.style.backgroundColor = clearTypeColors[leggendClearType];
                        }
                    });
                    result.push({
                        title: title,
                        difficulty: "(A)",
                        ClearType: leggendClearType
                    });
                }
                return result;
            }).filter(e => e.length !== 0); // [] を取り除く
            console.log(result);
            // 結果をアラート表示
            if (result.length > 0) {
                showToast(`${result.length}曲を塗りました`);
            } else {
                showToast('条件に該当する曲がありません');
            }
        } catch (e) {
            showToast('CSVの読み込みに失敗しました: ' + e.message);
        }
    };

    // オーバーレイに要素を追加
    overlay.appendChild(close);
    overlay.appendChild(textarea);
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    buttonContainer.appendChild(loadButton);
    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(restoreButton);
    buttonContainer.appendChild(diffButton);
    // オーバーレイにボタンコンテナを追加
    overlay.appendChild(buttonContainer);


    // オーバーレイをドキュメントに追加
    document.body.appendChild(overlay);
})();
