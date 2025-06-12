export const REG_EXPS = {
    PERSON_NAME: '^(?!.*^\\s)(?!.*\\s$)(?!^\\s*$)[A-Za-zА-Яа-яЁё.,\\- ]+$',
    MOVIE_TITLE: '^(?!\\s)(?!.*\\s$)[\\s\\S]*$', 
    NO_EMPTY: '\\S',
    POSITIVE_INTEGERS: '^(0|[1-9][0-9]*)$',
    POSITIVE_INTEGERS_FROM_ONE: '^(?:[1-9][0-9]{0,2}|1000)$'
};
