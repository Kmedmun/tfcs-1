jQuery(document).ready(function($){ 
  // arrays of phonemes to highlight per languages
  let arabic=['/ŋ/', '/p/', '/r/', '/ɪ/', '/ɛ/', '/æ/', '/ʌ/', '/o/', '/ɑ/', '/st/', '/sk/', '/sp/', '/sl/'];
  let cantonese=['/ʒ/', '/l/', '/n/', '/r/', '/v/', '/w/', '/e/', '/ɛ/', '/æ/', '/ʌ/', '/ɑ/', '/kw/'];
  let fuzhounese=['/b/', '/d/', '/dʒ/', '/ʒ/', '/g/', '/h/', '/r/', '/ʃ/', '/ɛ/', '/æ/', '/ɑ/'];
  let mandarin=['/ʒ/', '/l/', '/r/', '/v/', '/w/', '/e/', '/ɛ/', '/æ/', '/ʌ/', '/ɑ/', '/kw/'];
  let french=['/dʒ/', '/h/', '/t∫/', '/θ/', '/i/', '/ɪ/', '/æ/', '/ʊ/', '/ɑ/'];
  let japanese=['/h/', '/l/', '/r/', '/s/', '/ʃ/', '/v/', '/w/', '/ɪ/', '/ɛ/', '/æ/', '/ʌ/', '/ɑ/', '/kw/'];
  let korean=['/b/', '/d/', '/f/', '/g/', '/l/', '/r/', '/s/', '/ʃ/', '/v/', '/z/', '/i/', '/ɪ/', '/ɛ/', '/æ/', '/ʌ/', '/ɑ/', '/kw/'];
  let portuguese=['/dʒ/', '/l/', '/m/', '/n/', '/ŋ/', '/ʃ/', '/t∫', '/θ/', '/i/', '/ɪ/', '/ɛ/', '/æ/', '/ʌ/', '/st/', '/sk/', '/sp/', '/sl/'];
  let russian=['/h/', '/ŋ/', '/v/', '/w/', '/i/', '/ɪ/', '/e/', '/ɛ/', '/æ/'];
  let spanish=['/b/', '/dʒ/', '/ʃ/', '/t∫/', '/v/', '/y/', '/z/', '/i/', '/ɪ/', '/æ/', '/ʌ/', '/o/', '/ɑ/', '/st/', '/sk/', '/ks/', '/sp/', '/sl/'];

  let languages=[arabic,cantonese,fuzhounese,mandarin,french,japanese,korean,portuguese,russian,spanish];
  let languageNames=['arabic','cantonese','fuzhounese','mandarin','french','japanese','korean','portuguese','russian','spanish'];

  // add languages to highlight for each phoneme
  languages.forEach( (lang, i) => { 
  	lang.forEach( (phoneme) => {
  		$( "a.floating-box:contains('" + phoneme + "')").addClass(languageNames[i]);
  	} );
  } );

  // dropdown menu selection causes corresponding phonemes to be highlighted
  $('#dropdown').change(function(){ 
  	$("a.floating-box").removeClass("language-highlighted"); 
  	let val = $(this).val(); 
  	$("a."+val).addClass("language-highlighted");
  });
});
