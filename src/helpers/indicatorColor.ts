import {Color} from '../styles';

export const indicatorColor = (status: string) => {
  switch (status) {
    case 'Оплачено':
      return Color.secondary_600;
    case 'Завершен':
      return Color.succes_500;
    case 'Ожидает согласования':
      return Color.warning_500;
    case 'Ожидает публикации':
      return Color.warning_500;
    case 'Опубликован':
      return Color.info_500;
    case 'Принят в работу':
      return Color.secondary_600;
    case 'Отменен':
      return Color.secondary_400;
    case 'Отклонен':
      return Color.danger_500;
    default:
      return Color.warning_500;
  }
};

export const statusIndicatorColor = (status: string) => {
  switch (status) {
    case 'Модерация не пройдена':
      return Color.warning_500;
    default:
      return Color.secondary_600;
  }
};
