$(function(){ //jquery start

    let cnvs = document.getElementById("canvas");//idがcanvasである要素を取得
    let ctx = cnvs.getContext("2d");//canvasに2dで線やボックスを描画するメソッド

    // 変数と定数を事前に宣言
    const cnvWidth = 500;//canvasの横幅
    const cnvHeight = 300;//canvasの高さ
    let lineColor = "red";//デフォルトのペンの色
    let lineWeight = 5 ;//デフォルトのペンの太さ
    let clickFlag = 0 ;//後の処理で使うクリック判定
    let bgColor = "rgb(255,255,255)";//デフォルトの背景の色

    // 背景色の設定
    function setBgColor(){
        ctx.fillStyle = bgColor;
        ctx.fillRect(0,0,cnvWidth,cnvHeight);
    }
    // 背景を指定
    setBgColor();

// canvasでマウス操作があった時のイベント
    $("#canvas").mousedown(function(){
        clickFlag = 1;
    }).mouseup(function(){
        clickFlag = 0;
    }).mousemove(function(e){
        if(!clickFlag) return false;
        draw(e.offsetX,e.offsetY);//ユーザーがマウスを動かしている間の座標を取得して表示
    })

    // 描画する
    function draw(x,y){
        ctx.lineWidth = lineWeight; //線の太さ(デフォは５)
        ctx.strokeStyle = lineColor;//線の色(デフォはred)
        if (clickFlag == "1"){//マウスをおしたら
            clickFlag = "2";//フラグを2にする
            ctx.beginPath();//今あるパスをリセットする。
            ctx.lineCap = "round";//線を角丸に
            ctx.moveTo(x,y);//パスのスタート位置
        }else{
            ctx.lineTo(x,y);//パスを作る
        }
        ctx.stroke();//現在のパスの輪郭を表示する
    }

    // 色の変更
    $(".color a").on("click",function(){
        lineColor = $(this).data("color");
        return false;
    })

    // 太さの変更
    $(".weight a").on("click",function(){
        lineWeight = $(this).data("weight");
        return false;
    })

    // 全部消す
    $("#clear").on("click",function(){
        ctx.clearRect(0,0,cnvWidth,cnvHeight);
        setBgColor();
    })

    // canvasを画像として保存
    $("#download").click(function(){
        var canvas = document.getElementById("canvas");
        var base64 = canvas.toDataURL("image/jpag");
        document.getElementById("download").href = base64;
    });

}); //jquery end



function twitText() {
    var s, url;
    s = "jsでついったーを開いて投稿しているよ!%23sunabaco %23復習講座 %23canvas講座";
    url = document.location.href;
    
    if (s != "") {
        if (s.length > 140) {
            //文字数制限
            alert("テキストが140字を超えています");
        } else {
            //投稿画面を開く
            url = "http://twitter.com/share?url=" + escape(url) + "&text=" + s;
            window.open(url,"_blank","width=600,height=300");
        }
    }
}



