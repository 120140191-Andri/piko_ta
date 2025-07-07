<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Piko CarWash & Caffe | Dashboard Pesanan</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="assets/plugins/fontawesome-free/css/all.min.css">
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <link rel="stylesheet" href="assets/dist/css/adminlte.min.css">
  <style>
    body {
      background-color: #e0e0e0;
      color: #000;
    }
    .card {
      background: #fff;
      border: 1px solid #ccc;
    }
    .card-header {
      background-color: #555 !important;
      color: #fff;
    }
    .input-group-text {
      background: #777;
      color: #fff;
    }
    .btn {
      background: #888;
      color: #fff;
    }
    .btn:hover {
      background: #666;
    }
    .main-footer {
      background: #222;
      color: #fff;
    }
  </style>
</head>
<body class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">

  <?php  include 'komponen/side_bar.php'; ?>

  <div class="content-wrapper">
    <section class="content">
      <div class="container-fluid">
        <div class="card card-info">
          <div class="card-header">
            <h3 class="card-title">Data Pesanan Makanan</h3>
          </div>
          <div class="card-body">
            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Pelanggan</th>
                  <th>Menu</th>
                  <th>Jumlah</th>
                  <th>Status Pembayaran</th>
                  <th>Tanggal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Agus Santoso</td>
                  <td>Nasi Goreng Spesial</td>
                  <td>2</td>
                  <td>Selesai</td>
                  <td>07 03 2025 14.50</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Budi Wijaya</td>
                  <td>Mie Ayam Bakso</td>
                  <td>1</td>
                  <td>Proses</td>
                  <td>07 03 2025 14.50</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Citra Lestari</td>
                  <td>Ayam Geprek</td>
                  <td>3</td>
                  <td>Menunggu</td>
                  <td>07 03 2025 14.50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>

  <footer class="main-footer">
    <strong>Copyright &copy; by Piko CarWash & Caffe</strong>
    All rights reserved.
  </footer>
</div>

<script src="assets/plugins/jquery/jquery.min.js"></script>
<script src="assets/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="assets/dist/js/adminlte.js"></script>
</body>
</html>
