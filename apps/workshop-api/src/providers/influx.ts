import { Injectable } from '@nestjs/common';
import { InfluxDB, Point } from '@influxdata/influxdb-client';

@Injectable()
export class Influx extends InfluxDB {
  constructor() {
    super({
      url: 'http://localhost:8086', // Replace with your InfluxDB URL
      token: 'MubHub8cZNu3hmWiu87onyWwmq-oSPtdaY3QLpsM0iK6bhjtDKeD1qQpVRa_U_meRubwmLTpokGMugYInL1_ew==', // Replace with the token you created in InfluxDB
    });
  }

  writeApi(org: string, bucket: string) {
    return this.getWriteApi(org, bucket, 'ns');
  }

  writePoint(org: string, bucket: string, point: Point) {
    const writeApi = this.writeApi(org, bucket);
    writeApi.writePoint(point);
    writeApi
      .close()
      .catch((error) => {
        console.error('Error writing to InfluxDB', error);
      });
  }
}
