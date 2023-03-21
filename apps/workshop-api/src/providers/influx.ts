import { Injectable } from '@nestjs/common';
import { InfluxDB, Point } from '@influxdata/influxdb-client';

@Injectable()
export class Influx extends InfluxDB {
  constructor() {
    super({
      url: process.env.INFLUXDB_URL,
      token: process.env.INFLUXDB_TOKEN
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
