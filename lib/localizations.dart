import 'dart:async';

import 'package:flutter/material.dart';

class CountdownLocalizations {

  static CountdownLocalizations of(BuildContext context) {
    return Localizations.of<CountdownLocalizations>(context, CountdownLocalizations);
  }

  String get appTitle => 'CountdownManager';

}

class CountdownLocalizationsDelegate
  extends LocalizationsDelegate<CountdownLocalizations> {

  @override
  Future<CountdownLocalizations> load(Locale locale) {
    return Future(() => CountdownLocalizations());
  }

  @override
  bool shouldReload(CountdownLocalizationsDelegate old) => false;

  @override
  bool isSupported(Locale locale) =>
    locale.languageCode.toLowerCase().contains('en');

}
