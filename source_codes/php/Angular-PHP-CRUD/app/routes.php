<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/


/*
|--------------------------------------------------------------------------
| Home Controller
|--------------------------------------------------------------------------
*/
Route::get('/', 'HomeController@index');

/*
|--------------------------------------------------------------------------
| Account API Controller
|--------------------------------------------------------------------------
*/
Route::post('/account/ads', 'AccountController@store');

Route::get('/account/ads', 'AccountController@index');
Route::get('/account/ads/{id}', 'AccountController@show');
Route::put('/account/ads/{id}', 'AccountController@update');
Route::get('account', array('as' => 'home', function() {
	return View::make('ads.index');
}))->before('auth');


/*
|--------------------------------------------------------------------------
| Auth Controller
|--------------------------------------------------------------------------
*/
Route::get('logout', array('as' => 'logout', 'uses' => 'AuthController@logout'))->before('auth');
Route::post('login', 'AuthController@login');
Route::post('upload/avatar', 'AuthController@upload');
Route::post('register', 'AuthController@register');
Route::get('register', array('as'=>'register_form', 'uses' => 'AuthController@register_form'))->before('guest');
Route::get('login', array('as' => 'login', 'uses' => 'AuthController@index'))->before('guest');
Route::get('profile', array('as' => 'profile', 'uses' => 'AuthController@profile'))->before('auth');

/*
|--------------------------------------------------------------------------
| Contacts API Controller
|--------------------------------------------------------------------------
*/
Route::resource('contact', 'ContactsController');

Route::get('/item/{id}', function($id) {
	$value = Cache::get($id);
    if (empty($value)) {
		$value = LMongo::collection('ads')->where('_id', new MongoId($id))->first();
		$minutes = 200;
		Cache::put($id, $value, $minutes);
	}
	return View::make('item', array('ad' => $value, 'user_name' => 'Sardor I'));
});


Route::get('upload_image', function() {
	return View::make('upload');
});
Route::post('/api/upload', function() {
		$file = Input::file('image');


		$destinationPath = 'uploads/'.str_random(8);

		$filename = $file->getClientOriginalName();
		$upload_success = Input::file('image')->move($destinationPath, $filename);
		 
		if( $upload_success ) {
			$avatar = array(
				'avatar' => $destinationPath.'/'.$filename,
			);


			$id = LMongo::collection('users')
                ->where('_id', new MongoId( Auth::user()->id ))
                ->update($avatar);

            $arrayName = array(
            	'success' => 200, 
            	'avatar'=>$destinationPath.'/'.$filename);

            $id = LMongo::collection('ads')
                ->where('user_id', Auth::user()->id)
                ->update($avatar);

		   return Response::json($arrayName);
		} else {
		   return Response::json('error', 400);
		}
});





