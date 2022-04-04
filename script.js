 /* global $ */ 
 $(function(){
       // ユーザーの設計図を作成
    class User {
        // プロパティ(変数)
        name; //名前
        age; //年齢
        gender; //性別
        // コンストラクタ
        constructor(name, age, gender){
            // プロパティの値のセット
            this.name = name;
            this.age = age;
            this.gender = gender;
        }
        // 入力値の検証をするメソッド
        validate(){
            //入力が正しいかのフラッグを予め設定(フラッグ処理)
            let flag = true;
            // 注意メッセージが連続で出力されないように毎回spanタグを消す。
            $('span').remove();
            //もし名前が入力されていなければ
            if(this.name === '') {
                $('input[name="name"]').after($('<span>', {text: '名前を入力してください'}).addClass('error'));
                flag = false;
            }
            //もし年齢が入力されていなければ
            //名前と年齢は独立事象のため、else if で連結させない。
            if(this.age === '') {
                $('input[name="age"]').after($('<span>', {text: '年齢を入力してください'}).addClass('error'));
                flag = false;
            } else if(!/^[0-9]+$/.test(this.age)){ //年齢らしからぬものが入力されていれば。(正規表現されていない数字)
                 $('input[name="age"]').after($('<span>', {text: '年齢は正の整数で入力してください'}).addClass('error'));
                 flag = false;
            }
            return flag;
        }
    }
    // ユーザー一覧を作成
    const users = Array();
    // ユーザー一覧に岩井さん追加
    users.push(new User('岩井',25, 'male'));
    users.push(new User('島',18, 'female'));
    users.push(new User('青木', 100, 'male'));
    
    $('#h1').text('jQueryの練習').addClass('red');
    $('h2').eq(0).css('color','green');
    
    //ユーザー一覧をプレビュー画面に表示
    const disp_users = (all) => {
        $.each(all, (index, user) => {
        const ul = $('<ul>');
        const li_name = $('<li>', {text: user.name});
        if(user.gender === 'male'){
            li_name.css('color','blue');
        } else {
            li_name.css('color','red');
        }
        const li_age = $('<li>', {text: user.age + '歳'});
        const li_gender = $('<li>', {text: user.gender === 'male' ? '男性' : '女性'});
        ul.append(li_name);
        ul.append(li_age);
        ul.append(li_gender);
        $('#all').append(ul);
     });
        
    };
    // disp_users関数を実行
    disp_users(users);
    
    // 登録ボタンを押したときのイベント処理
    $('button').click(() => {
        // いったん表示をクリア
        $('#all').empty();
        // 入力された名前を取得
        const name = $('input[name="name"]').val();
        const age = $('input[name="age"]').val();
        const gender = $('input[name="gender"]:checked').val();
        // 新しいユーザー作成
        const user = new User(name, age, gender);
        // 入力値の検証を行う
        const flag = user.validate();
        if(flag === true){ //正しく入力された場合。
            // ユーザー一覧に追加
            users.push(user);
            // 正しく入力したら入力欄を空にする。
            $('input[name="name"]').val('');
            $('input[name="age"]').val('');
        }
        // console.log(users);
        disp_users(users);
    });
    
    // 性別が選択されたときの処理
    $('input[name="select_gender"]').on('click', () => {
        // div#allの中を空にする
        $('#all').empty();
        const select_gender = $('input[name="select_gender"]:checked').val(); 
        //console.log(select_gender);
        let select_users = users;
        if(select_gender !== 'all') {
            select_users = users.filter((user) => {
                if(user.gender === select_gender){
                    return user;
                }
            });
        }
        disp_users(select_users);
    });
 });
