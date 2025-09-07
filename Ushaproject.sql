create database ushaproject;
use ushaproject;
CREATE TABLE fleet (
  vehicle_id INT PRIMARY KEY,
  name VARCHAR(100),
  status VARCHAR(50),
  location_lat FLOAT,
  location_lng FLOAT
);

CREATE TABLE delivery (
  delivery_id INT PRIMARY KEY,
  vehicle_id INT,
  delivery_date DATE,
  status VARCHAR(50),
  FOREIGN KEY (vehicle_id) REFERENCES fleet(vehicle_id)
);
CREATE INDEX idx_vehicle_id ON delivery(vehicle_id);
CREATE INDEX idx_delivery_date ON delivery(delivery_date);
CREATE INDEX idx_status ON delivery(status);

SELECT * FROM fleet WHERE vehicle_id = 101;
INSERT INTO fleet (vehicle_id, name, status, location_lat, location_lng)
VALUES (102, 'Truck B', 'active', 12.9716, 77.5946);

INSERT INTO delivery (delivery_id, vehicle_id, delivery_date, status)
VALUES (3, 102, CURDATE(), 'completed');



INSERT INTO fleet (vehicle_id, name, status, location_lat, location_lng)
VALUES(107, 'Truck G', 'inactive', 12.9733, 77.5940);



ALTER TABLE delivery
ADD CONSTRAINT fk_vehicle
FOREIGN KEY (vehicle_id) REFERENCES fleet(vehicle_id);

SET FOREIGN_KEY_CHECKS = 0;
-- Run your insert or table changes
SET FOREIGN_KEY_CHECKS = 1;

select * from delivery;
SELECT * FROM fleet;


