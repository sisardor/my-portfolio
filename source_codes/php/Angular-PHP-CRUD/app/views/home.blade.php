@extends('layout')

@section('content')

<div class="">
    <h2>Home page</h2>


    		<div class="posts">
                <h1 class="content-subhead">Pinned Post - Current time: {{ date('F j, Y, g:i A') }}</h1>

                <?php  foreach ($ads as $key => $item) { ?>

                    <section class="post">
                        <header class="post-header">
                            <?php 
                                $avatar = ( isset($item["avatar"]) ? $item["avatar"] : "http://purecss.io/img/common/tilo-avatar.png" ); 
                            ?>
                            <img class="post-avatar" alt="Tilo Mitra's avatar" height="48" width="48" src="<?php echo $avatar; ?>">

                            <h2 class="post-title">   <?php echo '<a href="'."http://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'].'/item/' . $item['_id']->{'$id'} . '"  > '. $item['title'] .'</a>'; ?></h2>

                            <p class="post-meta">
                                By <a href="#" class="post-author"><?php echo $user_name; ?></a> under 
                                <a class="post-category post-category-design" href="#">CSS</a> 
                                <a class="post-category post-category-pure" href="/?category=<?php echo $item['cat']; ?>"><?php echo $item['cat']; ?></a>
                            </p>
                        </header>

                        <div class="post-description">
                            <p>
                                <?php echo Myhelper::myTruncate($item['text'], 150) ; ?> 

                                <?php echo '<a href="'."http://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'].'/item/' . $item['_id']->{'$id'} . '"> <i class="fa fa-long-arrow-right"></i> </a>' ?>
                            </p>
                        </div>
                    </section>

                 
                <?php } ?>
                <!-- A single blog post -->
                <!-- <section class="post">
                    <header class="post-header">
                        <img class="post-avatar" alt="Tilo Mitra's avatar" height="48" width="48" src="http://purecss.io/img/common/tilo-avatar.png">

                        <h2 class="post-title">Introducing Pure</h2>

                        <p class="post-meta">
                            By <a href="#" class="post-author">Tilo Mitra</a> under <a class="post-category post-category-design" href="#">CSS</a> <a class="post-category post-category-pure" href="#">Pure</a>
                        </p>
                    </header>

                    <div class="post-description">
                        <p>
                            Yesterday at CSSConf, we launched Pure – a new CSS library. Phew! Here are the <a href="https://speakerdeck.com/tilomitra/pure-bliss">slides from the presentation</a>. Although it looks pretty minimalist, we’ve been working on Pure for several months. After many iterations, we have released Pure as a set of small, responsive, CSS modules that you can use in every web project.
                        </p>
                    </div>
                </section> -->

            </div>
</div>
@stop