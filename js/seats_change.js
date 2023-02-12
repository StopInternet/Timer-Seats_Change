//定義
//クリックの判定
clicked = false;
//縦の取得
tate = 0;
//横の取得 
yoko = 0;
//席数の取得
classMem = tate*yoko;
//席数を挿入
inputs_seki = [null];
names_list = [];
search_seki = [];
no_shuffle_student = {};
students_name = {};
//シャフル対象外の多次元配列
no_shuffle_target ={}
lock_targets = 0;
lists_num = 0;
counters = 0;
nametxt_input = [];
namelists = [];
table_lists = [];
//マスの生成。
function MasGene(){
    if(clicked!=true){
        //値が0の時各種値を取得する。
        if(tate == 0 || yoko == 0 || classMem == 0){
            tate = document.getElementById("tate").value;
            yoko = document.getElementById("yoko").value;
            if(!isNaN(tate, yoko)){
            classMem = tate*yoko;
            }else{
                alert('数値で入力してください');
                return MasGene;
            }
            if(classMem == 0){
                alert('1~9の数値で入力してください。')
                return MasGene;
            }else{
            }
    }
    //説明文の追加
    document.getElementById("seki_dec").innerHTML = "名前を入力してください<br>空欄の箇所は「空席」として、<br>表示されます。<br>最大席数："+classMem+"席";

    //入力欄の生成処理
    for(var i=1;i<=classMem;i++){
        //idとclassを振り分けたinput情報を配列に入力
        inputs_seki.push('<div id="sekis_'+i+'">'+String(i).padStart(3,'0')+'  :'+
        '<input type="text" id="seki_'+i+'"maxlength="16" size="12" value=" ">'+
        '</div>');
    }
    //jonで一括展開
    document.getElementById("seki_list").innerHTML = inputs_seki.join('');
    clicked = true;
    //テーブルの生成
    //tableの設定
    let table = document.createElement('table');
    table.setAttribute('id','sekiTM');
    table.setAttribute('border','1');
    //theadの設定
    let thead = document.createElement('thead');
    //tbodyの設定
    let tbody = document.createElement('tbody');
    tbody.setAttribute('id','seki_model_body');
    table.appendChild(thead);
    table.appendChild(tbody);
    //divに登録
    document.getElementById('seki_model').appendChild(table);
    
    //配列読み込み用のカウンター
    var counter = 1;
    //テーブルを生成。
    for(var r=1;r<=tate;r++){
        /**
         * trで一列分を生成。
         * tdで名前を挿入
         * 見やすさで空白を挿入
         */
        let nameis = document.createElement('tr');
        for(var j=1;j<=yoko;j++){
            let j_data = document.createElement('td');
            j_data.innerHTML = "&nbsp"+String(counter).padStart(3,'0')+"&nbsp";
            nameis.appendChild(j_data);
            counter++;
        }
        //一列分の挿入。
        tbody.appendChild(nameis);
    }

    //csv読み込みを生成
    document.getElementById('input_csv').innerHTML = '名前入力欄を読み込む(Excel)<br><input type="file" id="getfile" accept="text/*" onchange="init();" style="size:300px">';

    //csv出力を生成
    document.getElementById('output_csv').innerHTML = '<input type="submit" id="downloads" value="名前入力欄を出力(Excel)" onclick="out_put()">';

    //
    document.getElementById('search_tab').innerHTML = '<input type="number" id="search-text" placeholder="検索番号を入力",value=""><br><input class="btn" type="button" id="names_seach" value="検索" onclick="search()"> <input class="btn btn-2" type="button" id="reset" value="リセット" onclick="Resets()"><br></br>'
}else{
    //二回クリックしたとき
    alert('一度のみクリックができます。\n再設定したい場合は、\nページを再読み込みしてください。')
}
}

//シャッフルボタンの機能
function Shuffle(){
  if(clicked == true){
    //既にテーブルがあった場合、テーブルの内容を削除
    if(document.getElementById("sekiTO") != null){
        document.getElementById("sekiTO").remove();
    }
    //配列の生成
    for(var i=1;i<=classMem;i++){
        //生徒名を連想配列に挿入
        if(document.getElementById("seki_"+i).value == " "){
            //空欄だった場合、空席を挿入
            students_name[i] = "空席"
        }else{
            //入力済みの場合、生徒名を挿入
            students_name[i] = document.getElementById("seki_"+i).value;
        }
    }

    //シャッフル処理
    function random_apps(classMem2){
        //forで処理
        for(var i = classMem2; 1 <= i; i--){
            // 0〜(i+1)の範囲で値を取得
            var r = 1 + Math.floor(Math.random()*i);
            // 要素の並び替えを実行
            var tmp = students_name[i];
            students_name[i] = students_name[r];
            students_name[r] = tmp;
            
        }
        //リターンで配列を返す。
          return students_name;
    }

    //テーブルの生成
    let table = document.createElement('table');
    //テーブルの設定
    table.setAttribute('id','sekiTO');
    table.setAttribute('border','1');
    //theadの設定
    let thead = document.createElement('thead');
    //tbodyの設定
    let tbody = document.createElement('tbody');
    tbody.setAttribute('id','seki_body');
    table.appendChild(thead);
    table.appendChild(tbody);

    //divに登録
    document.getElementById('seki_out').appendChild(table);
    //配列用のカウンターを設定
    var count = 1;
    //ランダムを起動
    random_apps(classMem);
    //席替え後のテーブルを生成
    for(var k = 1; k<=tate; k++){
        /**
         * trで横一列分の設定
         * tdで横一列の名前の設定
         */
        let namei = document.createElement('tr');
        namei.setAttribute('id','seki_tr')
        for(var i = 1; i <= yoko;i++){
            let i_data = document.createElement('td');
            i_data.setAttribute('id','seki_td');
            i_data.innerHTML = "&nbsp&nbsp"+students_name[count]+"&nbsp"
            namei.appendChild(i_data);
            count++;
        }
        
        //tbodyで一列分を生成。
        tbody.appendChild(namei);
        
        document.getElementById("output_excel").innerHTML='<br><input type="button" id="downloads" value="席替え後のデータを出力(Excel)" onclick="table_output()"><br>注意：出力後に.csv内に表示される数値は削除してお使いください。'
  }
}
else{
    //席モデルを生成していない場合。
    alert('座席モデルを生成してからクリックしてください。')
}
}

//検索機能
function search(){
    /**
     * 席を生成済みかどうかを検知
     * tryで例外処理に対応。
     */
    try{
        if(clicked == true){
            document.getElementById("the_result").innerHTML = " "
            for(var i=1;i<=classMem;i++){
                document.getElementById("sekis_"+i).style.display = 'block'; 
            }
            //検索対象を取得
            var search_target = document.getElementById("search-text").value;
            counters = 0;
            if(search_target == String){
                alert("文字型で入力を行ってください。")
            }
            //検索処理
            for(var i=1;i<=search_target;i++){
                //検索対象までカウンターに+1を設定
                counters++;
                if(counters == search_target){
                    //検索結果を表示
                    document.getElementById("the_result").innerHTML = "検索結果：";
                    break;
                }else if(classMem < search_target){
                    //検索対象が数値以外の場合
                    document.getElementById("the_result").innerHTML = "<span>検索結果：<br>その座席番号はありません。</span>"
                    break;
                }
                //検索対象になるまで入力欄を非表示にする。
                document.getElementById("sekis_"+i).style.display = 'none';
            }
        }else{
            //席モデルを生成していない場合。
            alert('座席モデルを生成してからクリックしてください。')}
        }catch(e){
        //例外がエラー発生時の処理。
        alert(e+"エラーが発生しました。\n不具合として報告をお願いします。");
    }
}

//検索履歴のリセット処理
function Resets(){
    //入力欄のすべてを表示させる処理。
    for(var i=1;i<=classMem;i++){
        document.getElementById("sekis_"+i).style.display = 'block'; 
    }
    //検索対象と、検索結果の値を空にする。
    document.getElementById("search-text").value = " ";
    document.getElementById("the_result").innerHTML = " ";
}

/**
 * for(var i=1;i<=classMem;i++){
            namelists.push(document.getElementById('seki_'+i).value);
        }
        //csvに展開し、改行して縦列に変換
        var content  = namelists.join(',\n');
        //csvの生成
        var mimeType = 'text/plain';
        var name     = 'name_list.csv';
 */
//ファイル出力処理
function out_put(){
    //席数を生成したかどうかを検知
    if(clicked == true){
        var input_names = prompt("ファイル名を入力してください：");
        if(input_names == ""){
            alert('ファイル名を入力してください')
            return out_put;
        }else if(input_names){
        //入力値を配列に出力
        for(var i=1;i<=classMem;i++){
            namelists.push(document.getElementById('seki_'+i).value);
        }
        //csvに展開し、改行して縦列に変換
        var content  = namelists.join(',\n');
        //csvの生成
        var mimeType = 'text/plain';
        var name = input_names+'.csv';
        var bom  = new Uint8Array([0xEF, 0xBB, 0xBF]);
        var blob = new Blob([bom, content], {type : mimeType});
        var a = document.createElement('a');
        a.download = name;
        a.target   = '_blank';
        if (window.navigator.msSaveBlob) {
            // for IE
            window.navigator.msSaveBlob(blob, name)
        }
        else if (window.URL && window.URL.createObjectURL) {
            // for Firefox
            a.href = window.URL.createObjectURL(blob);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        else if (window.webkitURL && window.webkitURL.createObject) {
            // for Chrome
            a.href = window.webkitURL.createObjectURL(blob);
            a.click();
        }
        else {
            // for Safari
            window.open('data:' + mimeType + ';base64,' + window.Base64.encode(content), '_blank');
        }
    }else{
    }
    }else{
        //席数が押されていなかった場合。
        alert('座席モデルを生成してからクリックしてください。')
    }
}
//読み込み処理
function init(){
    //席数が作られているかどうかの検知
    if(clicked =true){
        //ファイル値の取得
        var file = document.querySelector('#getfile');
        //csv→配列に。
        var nums = [];
        //value値のリセット
        for(var h = 1;h<=classMem;h++){
            document.getElementById("seki_"+h).value = " ";
        }
        //input変化時に読み込む
        file.onchange = function (){
            var fileList = file.files;
            var reader = new FileReader();
            reader.readAsText(fileList[0]);
            //読み込み後表示
        reader.onload = function  () {
            countnum = 1
            //csvを「,」で配列に挿入
            for(var i = 0;i<=reader.result.length;i++){
                if(reader.result[i] == ' '){
                    //値が空白だった場合、スルー
                    continue;
                }
                //「,」がつくまで配列に挿入
                nums = reader.result.split(',')
            }
            //seki_ valueに上書き表示
            for(var j=1;j<=nums.length;j++){
                document.getElementById("seki_"+j).value = nums[j-1]
            }
        };
    };
}else{
    //席数が押されていなかった場合の処理。
    alert('座席モデルを生成してからクリックしてください。')
  }
};

//table要素を配列に格納する。
function tableToMatrix() {
    $('tr').each(function(i) {
        table_lists[i] = [];
        $('td', $(this)).each(function(j) {
            table_lists[i][j] = $(this).text();
        });
    });
    return namelists;
}
//ファイル出力処理
function table_output(){
    //席数を生成したかどうかを検知
    if(clicked == true){
        //ファイル名の入力
        var inputs_name = prompt("ファイル名を入力してください：");
        if(inputs_name == ""){
            alert('ファイル名を入力してください');
            return table_output;
        }else if(inputs_name){
        //入力値を配列に出力
        tableToMatrix()
        //csvに展開し、改行して縦列に変換
        var content  = table_lists.join(',\n');
        //csvの生成
        var mimeType = 'text/plain';
        var name     = inputs_name+'.csv';
        var bom  = new Uint8Array([0xEF, 0xBB, 0xBF]);
        var blob = new Blob([bom, content], {type : mimeType});
        var a = document.createElement('a');
        a.download = name;
        a.target   = '_blank';
        if (window.navigator.msSaveBlob) {
            // for IE
            window.navigator.msSaveBlob(blob, name)
        }
        else if (window.URL && window.URL.createObjectURL) {
            // for Firefox
            a.href = window.URL.createObjectURL(blob);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        else if (window.webkitURL && window.webkitURL.createObject) {
            // for Chrome
            a.href = window.webkitURL.createObjectURL(blob);
            a.click();
        }
        else {
            // for Safari
            window.open('data:' + mimeType + ';base64,' + window.Base64.encode(content), '_blank');
        }
    }else{
    }
    }else{
        //席数が押されていなかった場合。
        alert('座席モデルを生成してからクリックしてください。')
    }
}