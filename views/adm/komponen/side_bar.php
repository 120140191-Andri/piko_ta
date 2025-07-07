<style>
    body { background-color: #f4f4f4; color: #333; font-family: Arial, sans-serif; }
    .content-header h1 { color: #333; }
    .small-box { background-color: #ddd; color: #333; border: 1px solid #ccc; }
    .small-box .inner h3, .small-box .inner p { color: #333; }
    .small-box-footer { background-color: #ccc; color: #333; text-decoration: none; }
    .small-box .icon { display: none; }
    .breadcrumb-item { color: #666; }
    .main-footer { background-color: #ccc; color: #333; text-align: center; padding: 10px; }
    .sidebar-dark-primarys { background-color: #ccc !important; }
    .active { background-color: #bbb !important; }
    .nav-link { color: #333 !important; }
  </style>

<!-- Navbar -->
<nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
    </ul>

    <ul class="navbar-nav ml-auto">
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-bell"></i>
          <span class="">Admin</span>
        </a>
      </li>
    </ul>
  </nav>

  <aside class="main-sidebar sidebar-dark-primarys elevation-4">
    <a href="" class="brand-link">
      <span class="brand-text font-weight-light p-3" style="color: black; font-size: 15px;">Piko Car Wash & Caffe</span>
    </a>

    <div class="sidebar">
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li class="nav-item">
            <a href="dash.php" class="nav-link">
              <i class="nav-icon fas fa-home"></i>
              <p>Dashboard</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="manage-pesan.php" class="nav-link ">
              <i class="nav-icon fas fa-file-contract"></i>
              <p>Manage Pesan Di Layar</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="antrian.php" class="nav-link ">
              <i class="nav-icon fas fa-file-contract"></i>
              <p>Data Antrian Cuci</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="pesanan.php" class="nav-link">
              <i class="nav-icon fas fa-file-contract"></i>
              <p>Data Pesanan Kafe</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="manage-harga-cuci.php" class="nav-link active">
              <i class="nav-icon fas fa-file-contract"></i>
              <p>Manage Harga Cuci</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="manage-menu.php" class="nav-link ">
              <i class="nav-icon fas fa-file-contract"></i>
              <p>Manage Menu Kafe</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="manage-pelanggan.php" class="nav-link">
              <i class="nav-icon fas fa-file-contract"></i>
              <p>Manage Pelanggan</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="ganti-password-kasir.php" class="nav-link">
              <i class="nav-icon fas fa-file-contract"></i>
              <p>Manage Password Kasir</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="ganti-password-admin.php" class="nav-link">
              <i class="nav-icon fas fa-lock"></i>
              <p>Ganti Password</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="" class="nav-link">
              <i class="nav-icon fas fa-sign-out-alt"></i>
              <p>Sign Out</p>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>