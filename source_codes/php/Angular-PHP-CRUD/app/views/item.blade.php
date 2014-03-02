@extends('layout')

@section('content')
<div class="">
    <h2>Item page</h2>


    		<div class="posts">
                <h1 class="content-subhead">Pinned Post - Current time: {{ date('F j, Y, g:i A') }}</h1>


                <!-- A single blog post -->
                <section class="post">
                    <header class="post-header">
                        <?php 
                                $avatar = ( isset($ad["avatar"]) ? $ad["avatar"] : "http://purecss.io/img/common/tilo-avatar.png" ); 
                            ?>
                        <img class="post-avatar" alt="Tilo Mitra's avatar" height="48" width="48" src="/<?php echo $avatar; ?>">

                        <h2 class="post-title"><?php echo $ad['title']; ?> </h2>

                        <p class="post-meta">
                            By <a href="#" class="post-author"><?php echo $user_name; ?> </a> under 
                            <a class="post-category post-category-design" href="#">CSS</a> 
                            <a class="post-category post-category-pure" href="#">Pure</a>
                        </p>
                    </header>

                    <div class="post-description">
                        <p>
                            <?php echo $ad['text']; ?> 
                        </p>
                    </div>
                </section>

            </div>
</div>
@stop