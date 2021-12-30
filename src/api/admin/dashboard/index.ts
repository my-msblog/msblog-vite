import { StatisticsVO } from '@/api/model/admin/dashboard';
import request from '@/utils/axios/request';

enum Api {
  getStatistic = '/board/card/value',

}
export function getStatistic(){
  return request.get<StatisticsVO>({
    url: Api.getStatistic,
  });
}
