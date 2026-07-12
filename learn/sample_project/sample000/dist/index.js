document.addEventListener("DOMContentLoaded", pageLoad);

function pageLoad(){


    var rollBotton = document.getElementById("rollButton");

    var diceArea=document.getElementById("diceContainer");


    var saikoro1Face = document.getElementById("dice1-face");
    var saikoro2face=document.getElementById("dice2-face");



    var dice3Face = document.getElementById("dice3-face");

    var stopBotton1 = document.getElementById("dice1-stopButton");
    var stopButton2=document.getElementById("dice2-stopButton");

    var stopBotton3 = document.getElementById("dice3-stopButton");

    // 結果表示するやつ
    var result = document.getElementById("result");

    if(result == null)
    {
        result=document.createElement("div");

        result.id="result";

        result.style.marginTop = "12px";

        if(diceArea!=null){

            diceArea.appendChild(result);

        }

    }






    var timer1 = null;
    var timer2 = null;
    var timer3 = null;

    var saikoro1 = 1;
    var saikoro2 = 1;
    var dice3 = 1;

    var stopFlg1 = false;
    var stopFlg2 = false;
    var stopFlg3 = false;





    function hyoujiUpdate(){

        if(saikoro1Face != null)
        {
            saikoro1Face.textContent = saikoro1;
        }


        if(saikoro2face!=null){
            saikoro2face.textContent = saikoro2;
        }



        if(dice3Face != null)
        {
            dice3Face.textContent = dice3;
        }


        var goukei = 0;

        goukei = goukei + saikoro1;
        goukei = goukei + saikoro2;
        goukei = goukei + dice3;



        if(result != null){

            result.textContent = "合計: " + goukei;

        }

    }






    function saikoroStart(){


        stopFlg1=false;

        stopFlg2 = false;


        stopFlg3=false;



        if(stopBotton1!=null){
            stopBotton1.disabled=false;
        }

        if(stopButton2 != null)
        {
            stopButton2.disabled = false;
        }


        if(stopBotton3!=null){
            stopBotton3.disabled=false;
        }




        if(timer1!=null){
            clearInterval(timer1);
        }


        if(timer2!=null){

            clearInterval(timer2);

        }

        if(timer3!=null){
            clearInterval(timer3);
        }






        timer1 = setInterval(function(){

            var randam = Math.random();

            saikoro1 = Math.floor(randam * 6)+1;

            hyoujiUpdate();

        },80);






        timer2 = setInterval(function(){

            var randomValue = Math.random();

            saikoro2 = Math.floor(randomValue * 6)+1;

            hyoujiUpdate();

        },120);




        timer3=setInterval(function(){

            var rand = Math.random();

            dice3 = Math.floor(rand * 6)+1;

            hyoujiUpdate();

        },160);

    }








    function saikoroStop(no){

        // 止める処理

        if(no == 0){

            if(stopFlg1 == false){

                stopFlg1 = true;

                if(timer1 != null){

                    clearInterval(timer1);

                    timer1 = null;

                }

                if(stopBotton1 != null){

                    stopBotton1.disabled = true;

                }

            }

        }
        else if(no == 1)
        {

            if(stopFlg2 == false){

                stopFlg2=true;

                if(timer2!=null){

                    clearInterval(timer2);

                    timer2=null;
                }

                if(stopButton2!=null){

                    stopButton2.disabled=true;

                }

            }

        }
        else
        {

            if(stopFlg3 == false){

                stopFlg3=true;

                if(timer3 != null){

                    clearInterval(timer3);

                    timer3 = null;

                }


                if(stopBotton3 != null){

                    stopBotton3.disabled = true;

                }

            }

        }

        // 全部止まったらそのまま
    }







    if(rollBotton != null){

        rollBotton.addEventListener("click",function(){

            saikoroStart();

        });

    }



    if(stopBotton1!=null){

        stopBotton1.addEventListener("click",function(){

            saikoroStop(0);

        });

    }






    if(stopButton2!=null){

        stopButton2.addEventListener("click", function(){

            saikoroStop(1);

        });

    }




    if(stopBotton3 != null){

        stopBotton3.addEventListener("click",function(){

            saikoroStop(2);

        });

    }






    // 最初の表示
    hyoujiUpdate();

}